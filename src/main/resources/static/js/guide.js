
import {Splide} from '../plugin/splide-4.1.3/js/splide.esm.js'






/**
 * @typedef {ListItemGroupType | ListItemContentsType} ListItemType
 * 
 * @typedef {Object} ListItemGroup
 * @property {string} text
 * @property {ListItemContentsType[]} items
 * @property {boolean} collapsed
 * 
 * 
 * @typedef {ListItemGroup} ListItemGroupType 
 * @property {string} text
 * @property {(ListItemContentsType | ListItemGroupType | ListItemGroup)[]} items
 * 
 * @typedef {Object} ListItemContentsType 
 * @property {string} text
 * @property {SetpContents[]} contents
 * 
 * @typedef {Object} SetpContents 
 * @property {string} title
 * @property {SubStep[]} subSteps
 * @property {string}videoSrc
 * 
 * @typedef {Object} SubStep 
 * @property {string} imgSrc
 * @property {string} text
 */

/*
let a = new Guide([
    {
        text:'컨텐츠 만들기',
        collapsed:false,
        items:[
            {
                text:'컨텐츠 등록하기',
                collapsed: false,
                items:[
                    {
                        text:'테이블',
                        contents:[
                            {
                                title:'컨텐츠 설정 조회',
                                videoSrc:"",
                                subSteps:[
                                    {
                                        imgSrc:"",
                                        text: "메인 화면의 우측 상단의 톱니바퀴 아이콘을 클릭합니다"
                                    },
                                    {
                                        imgSrc:"",
                                        text: "톱니바퀴 아이콘을 클릭하여 나오는 설정 메뉴 중 컨텐츠 아이콘을 클릭하면 컨텐츠 설정 화면이 표출됩니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "표출된 컨텐츠 설정화면에서 컨텐츠 조회 및 등록, 수정, 삭제가 가능합니다."
                                    }
                                ]
                            },
                            {
                                title:'컨텐츠 등록',
                                videoSrc:"",
                                subSteps:[
                                    {
                                        imgSrc:"",
                                        text: "신규 컨텐츠 등록을 위해 컨텐츠 등록 버튼을 클릭합니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "화면 우측 영역에 기본 컨텐츠 정보를 입력 후 컨텐츠API 유형 중 동적 API를 선택합니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "동적API를 선택 후 Check 버튼을 클릭하여 데이터 검증을 합니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "컨텐츠 유형에서 테이블 유형 중 한 개를 선택합니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "컨텐츠 유형에서 테이블 유형 중 한 개를 선택합니다."
                                    },
                                    {
                                        imgSrc:"",
                                        text: "테이블 유형을 선택 후 하단영역에 테이블 설정을 입력 및 선택 후 저장버튼을 클릭합니다."
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        text:'차트',
                        contents:[]
                    },
                    {
                        text:'라벨',
                        contents:[]
                    }
                ]
            }
        ]
    },
    {
        text:'1단계',
        items:[
            {
                text:'2단계-1',
                items:[
                    {
                        text:'3단계',
                        items:[
                            {text:'4단계-1',contents:[{title:'4-1'}]},
                            {text:'4단계-2',contents:[
                                {title:'4-2-1',markdown:'# 샘플 4-2-1\n* aa\n* dd',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
                                {title:'4-2-2',markdown:'# 샘플 4-2-2\n1. aa\n2. dd',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
                                {title:'4-2-3',markdown:'샘플 4-2-3',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}]},
                            {text:'4단계-3',items:[
                                {text:'5단계',contents:[
                                    {title:'5-1'},
                                    {title:'5-2'},
                                    {title:'1'}
                                ]}
                            ]}
                        ],
                        collapsed:false
                    },
                    {text:'3단계-2',contents:[{title:'1'},{title:'1'},{title:'1'}]}
                ],
                collapsed:false
            },
            {text:'2단계-1',items:[{text:'3단계',items:[{text:'4단계-1',contents:[{title:'4-1'}]},{text:'4단계-2',contents:[{title:'4-2-1'},{title:'4-2-2'},{title:'4-2-3'}]},{text:'4단계-3',items:[{text:'5단계',contents:[{title:'5-1'},{title:'5-2'},{title:'1'},{title:'1'},{title:'1'},{title:'1'},{title:'1'},{title:'1'}]}]}]},{text:'3단계-2',contents:[{title:'1'},{title:'1'},{title:'1'}]}]},
        ],
        collapsed:false
    },
],null,document.body)
*/

function showSampleGuide() {
    let a = new Guide([
        {
            text:'컨텐츠 만들기',
            collapsed:false,
            items:[
                {
                    text:'컨텐츠 등록하기',
                    collapsed: false,
                    items:[
                        {
                            text:'테이블',
                            contents:[
                                {
                                    title:'컨텐츠 설정 조회',
                                    videoSrc:"",
                                    subSteps:[
                                        {
                                            imgSrc:"/img/guide/contents/t1-1.png",
                                            text: "메인 화면의 우측 상단의 톱니바퀴 아이콘을 클릭합니다"
                                        },
                                        {
                                            imgSrc:"/img/guide/contents/t1-2.png",
                                            text: "톱니바퀴 아이콘을 클릭하여 나오는 설정 메뉴 중 컨텐츠 아이콘을 클릭하면 컨텐츠 설정 화면이 표출됩니다."
                                        },
                                        {
                                            imgSrc:"/img/guide/contents/t1-3.png",
                                            text: "표출된 컨텐츠 설정화면에서 컨텐츠 조회 및 등록, 수정, 삭제가 가능합니다."
                                        }
                                    ]
                                },
                                {
                                    title:'컨텐츠 등록',
                                    videoSrc:"",
                                    subSteps:[
                                        {
                                            imgSrc:"",
                                            text: "신규 컨텐츠 등록을 위해 컨텐츠 등록 버튼을 클릭합니다."
                                        },
                                        {
                                            imgSrc:"",
                                            text: "화면 우측 영역에 기본 컨텐츠 정보를 입력 후 컨텐츠API 유형 중 동적 API를 선택합니다."
                                        },
                                        {
                                            imgSrc:"",
                                            text: "동적API를 선택 후 Check 버튼을 클릭하여 데이터 검증을 합니다."
                                        },
                                        {
                                            imgSrc:"",
                                            text: "컨텐츠 유형에서 테이블 유형 중 한 개를 선택합니다."
                                        },
                                        {
                                            imgSrc:"",
                                            text: "컨텐츠 유형에서 테이블 유형 중 한 개를 선택합니다."
                                        },
                                        {
                                            imgSrc:"",
                                            text: "테이블 유형을 선택 후 하단영역에 테이블 설정을 입력 및 선택 후 저장버튼을 클릭합니다."
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            text:'차트',
                            contents:[]
                        },
                        {
                            text:'라벨',
                            contents:[]
                        }
                    ]
                }
            ]
        },
        {
            text:'1단계',
            items:[
                {
                    text:'2단계-1',
                    items:[
                        {
                            text:'3단계',
                            items:[
                                {text:'4단계-1',contents:[{title:'4-1'}]},
                                {text:'4단계-2',contents:[
                                    {title:'4-2-1',markdown:'# 샘플 4-2-1\n* aa\n* dd',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
                                    {title:'4-2-2',markdown:'# 샘플 4-2-2\n1. aa\n2. dd',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
                                    {title:'4-2-3',markdown:'샘플 4-2-3',videoSrc:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}]},
                                {text:'4단계-3',items:[
                                    {text:'5단계',contents:[
                                        {title:'5-1'},
                                        {title:'5-2'},
                                        {title:'1'}
                                    ]}
                                ]}
                            ],
                            collapsed:false
                        },
                        {text:'3단계-2',contents:[{title:'1'},{title:'1'},{title:'1'}]}
                    ],
                    collapsed:false
                },
                {text:'2단계-1',items:[{text:'3단계',items:[{text:'4단계-1',contents:[{title:'4-1'}]},{text:'4단계-2',contents:[{title:'4-2-1'},{title:'4-2-2'},{title:'4-2-3'}]},{text:'4단계-3',items:[{text:'5단계',contents:[{title:'5-1'},{title:'5-2'},{title:'1'},{title:'1'},{title:'1'},{title:'1'},{title:'1'},{title:'1'}]}]}]},{text:'3단계-2',contents:[{title:'1'},{title:'1'},{title:'1'}]}]},
            ],
            collapsed:false
        },
    ],document.body,{});
    a.mount();
    a.show();
}


const isDeepEqual = (object1, object2) => {

    if (object1 === object2) return false;
    if (!object1 || !object2) return false;
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);
    if (objKeys1.length !== objKeys2.length) return false;
    for (var key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];
    
        const isObjects = isObject(value1) && isObject(value2);
        
        if ((isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
};
class Guide {






    /**
     * 
     * @param {ListItemType[]} data 
     * @param {HTMLElement} target 
     * @param {*} option 
     */
    constructor(data,target,option) {
        // datas
        this.data = data;
        this.option = option;

        // states
        /**
         * @type {SetpContents[]}
         */
        this.selectedContents = null;
        this.step = 0;
        this.isMounted = false;
        this.isShow = false;

        // instance
        this.eventBus = new EventBus();
        /**
         * @type {import('../plugin/splide-4.1.3/types/index.d.ts').Splide}
         */
        this.carousel = null;

        // elements
        /**
         * @type {HTMLElement}
         */
        this.mountTarget = target;
        /**
         * @type {HTMLElement}
         */
        this.rootEl = null;
        /**
         * @type {HTMLElement}
         */
        this.backdrop = null;
        /**
         * @type {HTMLUListElement}
         */
        this.rootListEl = null;
        /**
         * @type {HTMLDivElement}
         */
        this.dialogBodyEl = null;




        this.#initGuideDialog(target);
    }

    /**
     * 
     * @param {HTMLElement} el 
     */
    mount(el){
        this.mountTarget.prepend(this.rootEl);
        this.mountTarget.prepend(this.backdrop);
    }
    unmount(){
        this.rootEl.remove();
    }

    /**
     * @param {boolean} arg 표시여부
     */
    show(arg){
        if (arg === undefined)  arg = true;
        this.rootEl.style.display = arg ? '' : 'none';
        this.backdrop.style.display = arg ? '' : 'none';
    }
    hide() {
        return this.show(false);
    }

    #initGuideDialog(){
        const tutorial_dialog = document.createElement("div");
        tutorial_dialog.classList.add("tutorial_dialog");
        tutorial_dialog.style.display = "none";
        this.rootEl = tutorial_dialog;

        const backdrop = document.createElement("div");
        backdrop.classList.add("modal-backdrop","show","fade");
        backdrop.style.display = "none";
        backdrop.style.zIndex = 90000;
        backdrop.addEventListener("click",()=>{
            this.hide();
        })
        this.backdrop = backdrop;

        // 왼쪽 메뉴
        const tutorial_menu = document.createElement("div");
        tutorial_menu.classList.add("tutorial_menu");
        tutorial_dialog.appendChild(tutorial_menu);

        const tutorial_sub_menu = document.createElement("div");
        tutorial_sub_menu.classList.add("tutorial_sub_menu");
        tutorial_menu.appendChild(tutorial_sub_menu);

        const titleH2 = document.createElement("h2");
        titleH2.innerText = "CODVILL";
        tutorial_sub_menu.appendChild(titleH2);

        const baseUl = document.createElement("ul");
        baseUl.classList.add("depth-0");
        tutorial_sub_menu.appendChild(baseUl);
        this.rootListEl = baseUl;


        // 바디
        const tutorial_body = document.createElement("div");
        tutorial_body.classList.add("tutorial_body");
        tutorial_dialog.appendChild(tutorial_body);
        this.dialogBodyEl = tutorial_body;
        
        const tutorial_close = document.createElement("div");
        tutorial_close.classList.add("tutorial_close");
        tutorial_body.appendChild(tutorial_close);

        const closeIcon = document.createElement("i");
        tutorial_close.classList.add("fa","fa-close");
        tutorial_close.appendChild(closeIcon);
        
        const stepper_wrapper = document.createElement("div");
        stepper_wrapper.classList.add("stepper-wrapper");
        stepper_wrapper.style.visibility = "hidden"
        this.dialogBodyEl.appendChild(stepper_wrapper);
        
        const content_area = document.createElement("div");
        content_area.classList.add("content_area");
        content_area.style.visibility = "hidden"
        this.dialogBodyEl.appendChild(content_area);



        for (const d of this.data) {
            this.#addListItem(d,baseUl,1);
        }

        
    }


    /**
     * 
     * @param {ListItemType} opt 
     * @param {HTMLElement} parEl 
     * @param {number} depth 
     */
    #addListItem(opt,parEl,depth) {

        const isGroup = opt.hasOwnProperty("items");

        // text설정
        const newLi = document.createElement("li");
        const newA = document.createElement("a");
        newA.innerText = opt.text;
        newLi.appendChild(newA);

        // 그룹 확장/축소
        newLi.isGroupCollapsed = opt.hasOwnProperty("collapsed") ? opt.collapsed : true;

        // 클릭 이벤트
        newLi.onclick = ev=>{
            if (isGroup) {
                // 그룹 확장/축소
                newLi.isGroupCollapsed = !newLi.isGroupCollapsed;
                opt.collapsed = newLi.isGroupCollapsed;
                newLi.querySelector("i").classList.toggle("fa-angle-right")
                newLi.querySelector("i").classList.toggle("fa-angle-down")
                newLi.childUl.style.display = newLi.isGroupCollapsed ? 'none' : ''
            }else {
                // 컨텐츠 선택 여부
                if (this.rootListEl && this.rootListEl.querySelector("li.on")) {
                    this.rootListEl.querySelector("li.on").classList.remove("on");
                }
                newLi.classList.add("on");

                // 컨텐츠 표시
                this.#showContents(opt.contents);
            }
        }

        parEl.appendChild(newLi);

        if (isGroup) { // group
            const isGroupCollapsed = newLi.isGroupCollapsed
            
            // 아이콘 추가
            const groupIcon = document.createElement("i")
            groupIcon.classList.add("fa",isGroupCollapsed ? "fa-angle-right" : "fa-angle-down");
            newLi.appendChild(groupIcon);

            // 새 리스트 추가
            const newUl = document.createElement("ul");
            newUl.classList.add("depth-"+depth);
            newUl.style.display = isGroupCollapsed ? 'none' : '';
            newLi.childUl = newUl;
            parEl.appendChild(newUl);

            const newDepth = depth > 3 ? depth : depth + 1;
            
            for (const groupItem of opt.items) {
                this.#addListItem(groupItem,newUl,newDepth);
            }
        }
    }

    /**
     * 
     * @param {SetpContents[]} opt 
     */
    #showContents(opt){
        if (!this.dialogBodyEl) return;
        if (isDeepEqual(opt,this.selectedContents)) return;
        this.selectedContents = opt;
        const stepper_wrapper = this.dialogBodyEl.querySelector(".stepper-wrapper");
        const content_area = this.dialogBodyEl.querySelector(".content_area");

        // 초기화
        stepper_wrapper.textContent = '';
        content_area.textContent = '';
        this.step = 0;

        for (let index = 0; index < opt.length; index++) {
            const stepOpt = opt[index];
            // render html
            const stepper_item = document.createElement("div");
            stepper_item.classList.add("stepper-item");
            // if (index === 0) stepper_item.classList.add("active");
            stepper_item.addEventListener("click",()=>{
                this.#changeStep(index);
            })
            stepper_wrapper.appendChild(stepper_item);
    
            const step_counter = document.createElement("div");
            step_counter.classList.add("step-counter");
            step_counter.textContent = "Step " + (index + 1);
            stepper_item.appendChild(step_counter);
            
            const step_name = document.createElement("div");
            step_name.classList.add("step-name");
            step_name.textContent = stepOpt.title;
            stepper_item.appendChild(step_name);
        }
        stepper_wrapper.style.visibility = "";
        content_area.style.visibility = "";
        this.#changeStep(this.step);




        
    }

    /**
     * 
     * @param {number} toChange 
     */
    #changeStep(toChange){
        // if (this.step === toChange) return;
        const stepper_item = this.dialogBodyEl.querySelectorAll(".stepper-item");
        this.step = toChange;
        
        // change step progress class
        stepper_item.forEach((e,i)=>{
            if (toChange === i) {
                if (!e.classList.contains("active")) e.classList.add("active");
            }else if (toChange > i ){
                if (e.classList.contains("active")) e.classList.remove("active");
                if (!e.classList.contains("complete")) e.classList.add("complete");
            }else{
                if (e.classList.contains("active")) e.classList.remove("active");
                if (e.classList.contains("complete")) e.classList.remove("complete");
            }
        });

        this.#setStepContent(this.selectedContents[toChange]);
    }

    /**
     * 
     * @param {SetpContents} content 
     */
    #setStepContent(content){
        const content_area = this.dialogBodyEl.querySelector(".content_area");
        content_area.textContent = '';

        if (!content || !content.subSteps || content.subSteps.length < 1) return;


        if(this.carousel) this.carousel.destroy(true);this.carousel = null;

        // splide carousel
        const splideSection = document.createElement("section");
        splideSection.classList.add("splide");
        content_area.appendChild(splideSection);
        
        const splideTrack = document.createElement("div");
        splideTrack.classList.add("splide__track");
        splideSection.appendChild(splideTrack);

        const splideList = document.createElement("ul");
        splideList.classList.add("splide__list");
        splideTrack.appendChild(splideList);

        for (const subStep of content.subSteps) {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide")
            splideList.appendChild(slide)

            const container = document.createElement("div");
            container.classList.add("splide__slide__container")
            slide.appendChild(container);

            const image = document.createElement("img");
            image.src = subStep.imgSrc;
            container.appendChild(image);
        }
        
        this.carousel = new Splide(splideSection,{
            type: 'loop',
            arrows:true,
            speed: 400, 
            easing:'ease-in-out',
            paginationDirection:'ltr',
            drag: true,
            wheel: false,
            width: 'auto',
            height: '500px',
            snap:true
        });
        this.carousel.on("move",(i,p,d)=>{
            stepUl.childNodes.forEach((e,index)=>{
                if (i === index) {
                    if (!e.classList.contains("currSubStep")) e.classList.add("currSubStep");
                }else{
                    if (e.classList.contains("currSubStep")) e.classList.remove("currSubStep");
                }
            });
        })
        this.carousel.mount();

        // sub step
        const substepArea = document.createElement("div");
        substepArea.classList.add("substep");
        content_area.appendChild(substepArea);

        const stepTitle = document.createElement("h3");
        stepTitle.textContent = content.title;
        substepArea.appendChild(stepTitle);

        const stepUl = document.createElement("ul");
        substepArea.appendChild(stepUl);


        for (let index = 0; index < content.subSteps.length; index++) {
            const subStep = content.subSteps[index];
            
            const newLi = document.createElement("li");
            newLi.classList.add("substep-text");
            if (index === 0) newLi.classList.add("currSubStep");
            newLi.addEventListener("click",(ev)=>{
                if (this.carousel) this.carousel.go(index);
                stepUl.childNodes.forEach((e,i)=>{
                    if (e.isSameNode((ev.target))) {
                        if (!e.classList.contains("currSubStep")) e.classList.add("currSubStep");
                    }else{
                        if (e.classList.contains("currSubStep")) e.classList.remove("currSubStep");
                    }
                });
            })
            newLi.textContent = subStep.text;
            stepUl.appendChild(newLi);
        }
    }
}



window.Guide = Guide;
window.showSampleGuide = showSampleGuide;