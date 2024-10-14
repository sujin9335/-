import { AlignmentType, Document, HorizontalPositionAlign, HorizontalPositionRelativeFrom, ImageRun, Media, Packer, Paragraph, Table, TableCell, TableRow, TextRun, VerticalPositionAlign, VerticalPositionRelativeFrom } from "../plugin/docx/build/index.js";


// const A4 = {
//     width:"21cm",
//     height:"29.7cm"
// };
// const A4_MARGIN = {
//     top:"2.54cm",
//     bottom:"2.54cm",
//     left:"1.91cm",
//     right:"1.91cm",
// }

//단위(cm)
const A4 = {
    width:21,
    height:29.7
};
const A4_MARGIN = {
    top:2.54,
    bottom:2.54,
    left:1.91,
    right:1.91,
}



/**
 * @typedef {Object} ContentsInfo tm_contents
 * @property {TM_CONTENTS} data
 * @property {string[]} data_color
 * @property {Array<any>} data_link
 * @property {Array<any>} data_param
 * @property {Array<any>} data_sub

 */

/**
 * @typedef {Object} TM_CONTENTS 
 * @property {string} contents_cd
 * @property {number} contents_type
 * @property {string} contents_title
 * @property {string} contents_api
 * @property {string} api_id
 * @property {string} api_server_type
 * @property {string} contents_link
 * @property {string} data_reload_cycle
 * @property {string} contents_sub_type
 * @property {string} pastdata_flag
 * @property {string} realtime_flag
 * @property {string} rotation_flag
 */

/**
 * @typedef {Object} TM_MONITOR
 * @property {string} monitor_cd
 * @property {string} monitor_title
 * @property {string} monitor_title_en
 * @property {string} monitor_sub_title
 * @property {string} monitor_sub_title_en
 * @property {string} monitor_scene
 * @property {number} monitor_x
 * @property {number} monitor_y
 * @property {number} monitor_width
 * @property {number} monitor_height
 * @property {string} header_view_yn
 * @property {string} monitor_theme
 * @property {string} monitor_alert_yn
 * @property {string} contents_cd
 * @property {string} user_cd
*/

/**
 * @typedef {Object} ReportMonitorData
 * @property {string} monitor_cd
 * @property {string} contents_cd
 * @property {TM_MONITOR} monitor_info
 * @property {ContentsInfo} contents_info
 * @property {HTMLElement} contents_element
 */

/**
 * @deprecated
 * @param {string} cate_cd 
 */
async function getReport(cate_cd) {

    const param = {
        map : {
            monitor_scene: {
                type:"E",
                val:cate_cd
            }
        }
    }

    /**@type {Array<TM_MONITOR>} 구성리스트 */
    const monitorList = await new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/monitor/select/list",
            data: JSON.stringify(param),
            dataType:"json",
            contentType:"application/json",
            success: function (response) {
                resolve(response.data)
            },
            error:e=>{
                reject([])
            }
        });
    })

    /**@type {ReportMonitorData[]} */
    let reportMonitor = [];

    for (const monitor of monitorList) {
        const contData = await getContData(monitor.contents_cd);
        // const contKind = contents_type_detail[contData.data.contents_type].contents_type_kind;
        // let contID = `${monitor.monitor_cd}_${contents_type_detail[contData.data.contents_type].contents_type_val}`;
        // if (contKind === "table") {
        //     contID += "_tab"
        // } else if (contKind === "chart"){
        //     contID += "_chart"
        // }

        const moniEl = document.querySelector(`div[monitor_cd="${monitor.monitor_cd}"`);
        const contEl = moniEl.querySelector(".card-box") ?? (moniEl.querySelector("div") ?? moniEl)
        // let contEl = document.getElementById(contID);

        /**@type {ReportMonitorData} */
        const obj = {
            monitor_cd: monitor.monitor_cd,
            monitor_info: monitor,
            contents_cd: monitor.contents_cd,
            contents_info: contData,
            // to_img: contKind !== "table" || contData.contents_type === 28,
            contents_element: contEl
        }
        reportMonitor.push(obj);
    }

    const doc = await getDoc(reportMonitor);
    
    const docBlob = await Packer.toBlob(doc)
    console.log(docBlob);
    downloadBlob(docBlob,"report.docx");
    
    return doc;
}

/**
 * @deprecated
 * @param {string} contents_cd_param 
 * @returns {Promise<ContentsInfo>}
 */
async function getContData(contents_cd_param) {
    const param = {
        contents_cd: contents_cd_param
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "/contents/select/get",
            data: JSON.stringify(param),
            dataType:"json",
            contentType:"application/json",
            success: function (response) {
                resolve(response)
            },
            error:e=>{
                reject(e)
            }
        });
    })
}

/**
 * word 문서 작성
 * @deprecated
 * @param {ReportMonitorData[]} reports 
*/
async function getDoc(reports) {

    /** @type {Array<Paragraph|Table>} */
    let docContents = [];

    for (const rmData of reports) {
        // 타이틀 -> 이미지에 포함
        // const titles = getTitle(
        //     rmData.monitor_info[`monitor_title${window.lang_set !== 'ko' ? ("_"+window.lang_set) : ""}`],
        //     rmData.monitor_info[`monitor_sub_title${window.lang_set !== 'ko' ? ("_"+window.lang_set) : ""}`]
        // );

        // 테이블 컨텐츠도 이미지로 캡처하도록 변경
        // const content = rmData.to_img ? await getImg(rmData.contents_element,{offsetT:rmData.monitor_info.monitor_x,offsetL:rmData.monitor_info.monitor_y}) : getTable(rmData.contents_element);
        
        const content =  await getImg(rmData.contents_element,rmData);
        docContents.push(content);
        // docContents.push(...titles,content);
    }

    const doc = new Document({
        sections:[{
            properties:{
                page: {
                    size:{
                        width:pxToCm(document.querySelector("body > div.ui-layout-center").offsetWidth).toFixed(2)+"cm",
                        height:pxToCm(document.querySelector("body > div.ui-layout-center").scrollHeight).toFixed(2)+"cm"
                    },
                    margin:{
                        top:"2.54cm",
                        bottom:"2.54cm",
                        left:"1.91cm",
                        right:"1.91cm",
                    }
                }
            },
            children:docContents
        }],
        background:{
            color: window.theme === 'white' ? "#ffffff" : "#24282d"
        }
    });


    return doc;
}

/**
 * @deprecated 타이틀도 이미지로 변경
 * @param {string} title 
 * @param {string} subtitle 
 * @returns {Paragraph[]}
 */
function getTitle(title,subtitle) {
    const titleDoc = new Paragraph({
        alignment:AlignmentType.BOTH,
        children:[
            new TextRun({
                size:`18pt`,
                text:"■  "+title,
                bold: true,
            }),
        ],
        
        frame:{
            alignment:{
                x: HorizontalPositionAlign.CENTER,
                y: VerticalPositionAlign.BOTTOM
            }
        },
        
    })
    const subtitleDoc = new Paragraph({
        alignment:AlignmentType.RIGHT,
        children:[
            new TextRun({
                size:`11pt`,
                text:subtitle,
                bold: true
            }),
        ]
    })
    return [titleDoc,subtitleDoc];
}

/**
 * @deprecated
 * @param {HTMLElement} element 
 * @param {ReportMonitorData} rmData 
 * @returns {Promise<Paragraph>} image Paragraph
 */
async function getImg(element,rmData) {
    if (!element) {
        return undefined
    }

    // 기존 가로를 페이지 너비에 맞게 이미지 키우기
    // const imgW = rmData.monitor_info.monitor_width;
    // const imgH = rmData.monitor_info.monitor_height;
    // const imgRatio = imgW / imgH;
    // 이미지 사이즈 (가로를 페이지 너비에 맞게)
    // const setImgW = window.innerWidth - A4_MARGIN.left - A4_MARGIN.right - 1;
    // const setImgH = setImgW / imgRatio;

    const image_blob = await htmlToImage.toBlob(element,{
        backgroundColor:"#00000000",
        imagePlaceholder: ""
    });
    console.log(element,image_blob);
    // downloadBlob(image_blob,element.id ?? "aa" + ".png")

    // const imageBuffer = dataUriToBuffer(image_blob);
    const imagePar = new Paragraph({
        children:[
            new ImageRun({
                data:image_blob,
                transformation:{
                    width:element.offsetWidth,
                    height:element.offsetHeight,
                },
                floating:{
                    horizontalPosition: {
                        offset:Math.floor(pxToEmu(rmData.monitor_info.monitor_y)),
                    },
                    verticalPosition: {
                        offset: Math.floor(pxToEmu(rmData.monitor_info.monitor_x))
                    },
                    // behindDocument: false,
                    allowOverlap: true,
                },
            })
        ]
    });
    return imagePar
}

function cmToEMU(cm) {
    return cm / 2.54 * 72 * 20
}

function cmToPx(cm) {
    return cm / 2.54 * 72
}
/**
 * @typedef {Object} TableOpt
 * @property {number} width
 */


/**
 * @deprecated 테이블도 이미지로 변경
 * @param {HTMLTableElement} tblElement 
 * @param {TableOpt} opts 
 * @returns {Table}
 */
function getTable(tblElement,opts) {
    const tableDocx = new Table({
        rows:getTableRow(tblElement),
    })

    return tableDocx;
}

/**
 * @deprecated 테이블도 이미지로 변경
 * @param {HTMLTableElement} tblElement 
 */
function getTableRow(tblElement) {
    const trList = tblElement.querySelectorAll("tr");
    let tableRowList = [];
    trList.forEach((el,idx)=>{
        const tableRow = new TableRow({
            children: getTableCell(el),
            tableHeader: idx === 0
        })
        tableRowList.push(tableRow);
    });
    return tableRowList;
}
/**
 * @deprecated 테이블도 이미지로 변경
 * @param {HTMLTableRowElement} trow 
 * @returns {Array<TableCell>}
 */
function getTableCell(trow) {
    const thtdList = trow.querySelectorAll("th, td");

    let cellList = [];
    thtdList.forEach(el=>{
        const cell = new TableCell({
            children: [new Paragraph(el.innerText)]
        })
        cellList.push(cell);
    })
    return cellList;
}

const pxToCm72dpi = 2.54/72;

/**
 * px - cm변환
 * @param {number} px 
 * @returns {number}
*/
function pxToCm(px) {
    return px*pxToCm72dpi;
}
/**
 * px - 인치변환
 * @param {number} px 
 * @returns {number}
*/
function pxToInch(px) {
    return px/72*914400;
}
/**
 * px - Emu(워드 단위)변환
 * @param {number} px 
 * @returns {number}
 */
function pxToEmu(px) {
    return px/72*914400;
}

/**
 * @typedef {Object} ReportOption
 * @property {(instance:ContentReport)=>void} onReady
 * @property {(instance:ContentReport)=>void} onDocCreated
 * @property {(instance:ContentReport)=>void} onSceneReady
 * @property {(data:ReportProgress)=>void} onProgress
 * @property {string} backgroundColor
 * @property {string} fileName
 */
/**
 * @typedef {Object} ReportProgress
 * @property {string} msg 메시지
 * @property {number} value 진행도
 */
/**
 * @typedef {"ready" | "scene-ready" | "created" | "progress"} ReportEvents
 */


export class ContentReport {
    static pxToCm72dpi = 2.54/72;
    /**
     * 
     * @param {string} cate_cd 카테고리 코드
     * @param {ReportOption} option 옵션
     */
    constructor(cate_cd, option){

        this.cate_cd = cate_cd;
        this.isReady = false;
        this.isCreated = false;
        this.isSceneReady = false;
        this.progress = 0;
        
        this.eventBus = new EventBus();
        if (option.onReady && typeof option.onReady === 'function')this.eventBus.on("ready",option.onReady);
        if (option.onDocCreated && typeof option.onDocCreated === 'function')this.eventBus.on("created",option.onDocCreated);
        if (option.onSceneReady && typeof option.onSceneReady === 'function')this.eventBus.on("scene-ready",option.onSceneReady);
        if (option.onProgress && typeof option.onProgress === 'function')this.eventBus.on("progress",option.onProgress);
        if (option.backgroundColor && typeof option.backgroundColor === 'string')this.backgroundColor = option.backgroundColor;
        if (option.fileName && typeof option.fileName === 'string')this.fileName = option.fileName;
        
        (async ()=>{
            if (this.cate_cd !== window.scene_cd) {
                window.getCategoryMonitor(this.cate_cd,"");
                await waitForAllContentLoad();
            }
            this.isSceneReady = true;
            this.eventBus.dispatch("scene-ready",this);
        })()
    }

    /**
     * 이벤트 리스너
     * @param {ReportEvents} eventNm 
     * @param {(instance:ContentReport)=>void} callback 
     */
    on(eventNm,callback) {
        if (eventNm === 'ready' && this.isReady) return callback(this);
        if (eventNm === 'created' && this.isCreated) return callback(this);
        return this.eventBus.on(eventNm,callback);
    }
    /**
     * 이벤트 리스너 한번 실행(매크로)
     * @param {ReportEvents} eventNm 
     * @param {(instance:ContentReport)=>void} callback 
     */
    once(eventNm,callback) {
        if (eventNm === 'ready' && this.isReady) return callback(this);
        if (eventNm === 'created' && this.isCreated) return callback(this);
        return this.eventBus.once(eventNm,callback);
    }
    /**
     * 이벤트 리스너 해제
     * @param {ReportEvents} eventNm 
     * @param {(instance:ContentReport)=>void} callback 
     */
    off(eventNm,callback) {
        return this.eventBus.off(eventNm,callback);
    }
    /**
     * 이벤트 리스너 전체 해제
     * @param {ReportEvents} eventNm 
     */
    offAll(eventNm) {
        return this.eventBus.offAll(eventNm);
    }

    /**
     * 
     * @returns {Promise<Array<TM_MONITOR>>}
     */
    async #getMonitorData(){
        const param = {
            map : {
                monitor_scene: {
                    type:"E",
                    val:this.cate_cd
                }
            }
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/monitor/select/list",
                data: JSON.stringify(param),
                dataType:"json",
                contentType:"application/json",
                success: function (response) {
                    resolve(response.data)
                },
                error:e=>{
                    reject([])
                }
            });
        })
    }

    /**
     * 
     * @param {string} contents_cd_param 
     * @returns {Promise<ContentsInfo>}
     */
    async #getContData(contents_cd_param) {
        const param = {
            contents_cd: contents_cd_param
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/contents/select/get",
                data: JSON.stringify(param),
                dataType:"json",
                contentType:"application/json",
                success: function (response) {
                    resolve(response)
                },
                error:e=>{
                    reject(e)
                }
            });
        })
    }

    async #getImg(element,rmData) {
        if (!element) {
            return undefined
        }
        const image_blob = await htmlToImage.toBlob(element,{
            backgroundColor:"#00000000",
            imagePlaceholder: ""
        });
        const imagePar = new Paragraph({
            children:[
                new ImageRun({
                    data:image_blob,
                    transformation:{
                        width:element.offsetWidth,
                        height:element.offsetHeight,
                    },
                    floating:{
                        horizontalPosition: {
                            offset:Math.floor(pxToEmu(rmData.monitor_info.monitor_y)),
                        },
                        verticalPosition: {
                            offset: Math.floor(pxToEmu(rmData.monitor_info.monitor_x))
                        },
                        allowOverlap: true,
                    },
                })
            ]
        });
        return imagePar
    }


    /**
     * word 문서 작성
     * @param {ReportMonitorData[]} reports 
    */
    async #getDoc(reports) {

        /** @type {Array<Paragraph|Table>} */
        let docContents = [];
        let cnt = 1;
        for (const rmData of reports) {
            this.progress += Math.floor((40/reports.length))
            this.eventBus.dispatch("progress",{msg:`컨텐츠 생성 중 (${cnt++}/${reports.length})`,value:this.progress})
            const content =  await this.#getImg(rmData.contents_element,rmData);
            docContents.push(content);
            // docContents.push(...titles,content);
        }

        const doc = new Document({
            sections:[{
                properties:{
                    page: {
                        size:{
                            width:pxToCm(document.querySelector(".ui-layout-center").offsetWidth).toFixed(2)+"cm",
                            height:pxToCm(document.querySelector(".ui-layout-center").scrollHeight).toFixed(2)+"cm"
                        },
                        margin:{
                            top:"2.54cm",
                            bottom:"2.54cm",
                            left:"1.91cm",
                            right:"1.91cm",
                        }
                    }
                },
                children:docContents
            }],
            background:{
                color: this.backgroundColor ? this.backgroundColor : (window.theme === 'white' ? "#ffffff" : "#24282d")
            }
        });
        return doc;
    }

    async createReport(){
        this.progress = 0;

        if (!this.isSceneReady) {
            this.eventBus.dispatch("progress",{msg:"카테고리 전환중",value:this.progress})
            await new Promise((resolve, reject) => {
                this.eventBus.once("scene-ready",()=>{
                    resolve();
                })
                setTimeout(() => {
                    resolve();
                }, 1000);
            })
        }


        this.eventBus.dispatch("progress",{msg:"구성 데이터 로드중",value:this.progress})
        const monitorList = await this.#getMonitorData();
        this.progress+=10
        this.eventBus.dispatch("progress",{msg:"구성 데이터 로드완료",value:this.progress})
        /** @type {ReportMonitorData[]} */
        this.reportMonitorData = [];
        let cnt = 1;
        for (const monitor of monitorList) {
            this.progress += Math.floor((30/monitorList.length));
            this.eventBus.dispatch("progress",{msg:"컨텐츠 데이터 로드중"+` (${cnt}/${monitorList.length})`,value:this.progress});
            cnt++;
            const contData = await this.#getContData(monitor.contents_cd);
            const moniEl = document.querySelector(`div[monitor_cd="${monitor.monitor_cd}"`);
            const contEl = moniEl.querySelector(".card-box") ?? (moniEl.querySelector("div") ?? moniEl)
    
            /**@type {ReportMonitorData} */
            const obj = {
                monitor_cd: monitor.monitor_cd,
                monitor_info: monitor,
                contents_cd: monitor.contents_cd,
                contents_info: contData,
                contents_element: contEl
            }
            this.reportMonitorData.push(obj);
        }
        this.isReady = true;
        this.eventBus.dispatch("ready",this);

        this.progress += 10
        this.eventBus.dispatch("progress",{msg:"문서 생성 중",value:this.progress})
        const doc = await this.#getDoc(this.reportMonitorData);
        this.eventBus.dispatch("progress",{msg:"문서 생성 완료",value:this.progress+=5})
        this.doc = doc;
        this.eventBus.dispatch("created",this,doc);
        
        this.eventBus.dispatch("progress",{msg:"파일 생성 중",value:this.progress})
        const docBlob = await Packer.toBlob(doc)
        downloadBlob(docBlob,this.fileName ? this.fileName :`report_${new Date().toLocaleString("en-US",{hour12:false,hour:'2-digit',month:'2-digit',year:'numeric',day:'2-digit',minute:'2-digit',second:'2-digit'}).replace(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})/,"$3$1$2$4$5$6")}_${this.cate_cd}`+this.cate_cd+".docx");
        this.progress=100
        this.eventBus.dispatch("progress",{msg:"보고서 생성 완료!",value:this.progress});
        
        return doc;
    }
}

/**
 * 
 * @param {string} cate_cd 
 * @param {ReportOption} opt 
 */
async function exportReport(cate_cd,opt) {
    const overlay = document.createElement("div");
    overlay.style = "background: rgba(0,0,0,.6);position: fixed;z-index: 100113;width: 100%;height: 100%;top: 0;left: 0;"

    const progress_container = document.createElement("div");
    progress_container.style.margin = "20% 10% 0";
    progress_container.style.textAlign = "center"

    const progress_msg = document.createElement("div");
    progress_msg.style.fontSize = "30px"
    progress_msg.style.marginBottom = "15px"
    progress_msg.innerText="보고서 생성중입니다."
    progress_container.appendChild(progress_msg);

    const progress = document.createElement("div");
    progress.classList.add("progress");
    const process_bar = document.createElement("div");
    process_bar.classList.add("progress-bar","progress-bar-striped","progress-bar-animated");
    process_bar.style.width = "0%"
    progress.appendChild(process_bar);
    progress_container.appendChild(progress);
    
    overlay.appendChild(progress_container);
    document.body.prepend(overlay);
    const {onProgress,...rOpt} = opt || {onProgress:null};
    const report = new ContentReport(cate_cd,{
        onProgress:({msg,value})=>{
            progress_msg.innerText = msg;
            process_bar.style.width = value+"%";
            if (onProgress) return onProgress({msg,value});
        }, ...rOpt
    });
    return report.createReport().finally(()=>{
        overlay.remove();
        progress_container.remove();
        progress_msg.remove();
        progress.remove();
        process_bar.remove();
    }).catch(e=>{
        window.alertify.error('<i class="icon fa fa-ban"></i> ' + "보고서 생성중 오류가 발생했습니다.");
    });
}






//set global
window.getReport = getReport;
window.ContentReport = ContentReport;
window.exportReport = exportReport;