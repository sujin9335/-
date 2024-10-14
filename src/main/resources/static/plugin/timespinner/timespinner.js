/*
 * jQuery UI timeSpinner 0.2
 *
 * This is an opinionated jQuery UI widget for setting
 * 24-hour formatted time (HH:MM) or
 * AM/PM formatted time (HH:MM AM/PM)
 *
 * There are 2 widgets: textSpinner and timeSpinner
 *
 * textSpinner is a generic spinner that spins through text values
 * instead of numbers.
 * Default values are "AM" and "PM".
 *
 * timeSpinner combines textSpinner and the native jQuery UI Spinner
 * to complete the entire widget.
 */

$.widget('ty.textSpinner', $.ui.spinner, {
    options: {
        values: ['AM', 'PM']
    },
    _parse: function(value) {
        if (typeof value === "string") {
            return this.options.values.indexOf(value);
        }
        return value;
    },
    _format: function(value) {
        //wrap around
        if (value < 0) {
            value = this.options.values.length - 1;
        }
        if (value > this.options.values.length - 1) {
            value = 0;
        }
        var format = this.options.values[value];
        return format;
    }
});

$.widget('ty.timeSpinner', {

    options: {
        /**
         * 'value' is ALWAYS in 24-hour format
         */
        value: '00:00',

        /**
         * 'ampm' toggles the UI between 24-hour and 12-hour formats
         */
        ampm: false,

        /**
         * The jQuery UI spinner's "stop" event
         * fired from any one of the spinners: HH, MM or AMPM
         */
        stop: function(event, ui) {
            //
        }
    },

    _create: function() {
        var $this = this.element;

        var _this = this;

        var iWidth = $this.outerWidth();

        $this.addClass('ui-timespinner-value');

        var $container = $('<div>', {
            'class': 'ui-timespinner ui-widget ui-widget-content ui-corner-all'
        });

        $this.wrap($container);

        $container = $this.parent();

        var $colon = $('<div>', {
            'class': 'ui-timespinner-colon'
        }).text(':');

        var $hh = $('<input>', {
            'type': 'text',
            'class': 'number ui-timespinner-hh'
        });

        var $mm = $('<input>', {
            'type': 'text',
            'class': 'number ui-timespinner-mm'
        });

        var $ampm = $('<input>', {
            'type': 'text',
            'class': 'ui-timespinner-ampm'
        });

        $container.append($hh);
        $container.append($colon);
        $container.append($mm);
        $container.append($ampm);

        $hh
            .spinner({
                'min': 0,
                'max': 23,
                'numberFormat': 'd2',
                'culture': 'en-EN',
                'mouseWheel': true,
                'spin': function(event, ui) {
                    if (_this.options.ampm) {
                        if (parseInt(ui.value) == 12 && parseInt(this.value) == 12) {
                            this.value = '01';
                            return false;
                        } else if (parseInt(ui.value) == 1 && parseInt(this.value) == 1) {
                            this.value = '12';
                            return false;
                        }
                    } else {
                        if (parseInt(ui.value) == 23 && parseInt(this.value) == 23) {
                            this.value = '00';
                            return false;
                        } else if (parseInt(ui.value) == 0 && parseInt(this.value) == 0) {
                            this.value = '23';
                            return false;
                        }
                    }

                },
                'stop': function(event, ui) {
                    _this._setElementValue();

                    if ($.isFunction(_this.options.stop)) {
                        _this.options.stop.apply(_this, arguments);
                    }
                }
            })
            .on('mousewheel.timeSpinner', _this._inputOnMouseWheel)
            .on('keypress.timeSpinner', _this._inputOnKeypress)
            .attr({
                'maxlength': 2
            });

        $mm
            .spinner({
                'min': 0,
                'max': 59,
                'numberFormat': 'd2',
                'culture': 'en-EN',
                'mouseWheel': true,
                'spin': function(event, ui) {
                    if (parseInt(ui.value) == 59 && parseInt(this.value) == 59) {
                        this.value = '00';
                        return false;
                    } else if (parseInt(ui.value) == 0 && parseInt(this.value) == 0) {
                        this.value = '59';
                        return false;
                    }
                },
                'stop': function(event, ui) {
                    _this._setElementValue();

                    if ($.isFunction(_this.options.stop)) {
                        _this.options.stop.apply(_this, arguments);
                    }
                }
            })
            .on('mousewheel.timeSpinner', _this._inputOnMouseWheel)
            .on('keypress.timeSpinner', _this._inputOnKeypress)
            .attr({
                'maxlength': 2
            });

        $ampm
            .textSpinner({
                'mouseWheel': true,
                'stop': function(event, ui) {
                    _this._setElementValue();

                    if ($.isFunction(_this.options.stop)) {
                        _this.options.stop.apply(_this, arguments);
                    }
                }
            })
            .on('mousewheel.timeSpinner', function(event) {
                var $this = $(this);

                if ($this.prop('disabled') == false) {
                    if (event.originalEvent.wheelDelta > 0) {
                        $this.textSpinner('stepUp');
                    } else {
                        $this.textSpinner('stepDown');
                    }

                    event.preventDefault();

                    try {
                        this.select();
                    } catch (err) {
                        // ignore
                    }
                }
            })
            .on('keypress.timeSpinner', function(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            })
            .attr({
                'maxlength': 2
            });

        var hhSpinner = $hh.spinner('instance');
        var $hhSpinner = hhSpinner.uiSpinner;
        $hhSpinner.addClass('ui-timespinner-hh');
        this.$hh = $hh;
        this.hhSpinner = hhSpinner;
        this.$hhSpinner = $hhSpinner;

        var mmSpinner = $mm.spinner('instance');
        var $mmSpinner = mmSpinner.uiSpinner;
        $mmSpinner.addClass('ui-timespinner-mm');
        this.$mm = $mm;
        this.mmSpinner = mmSpinner;
        this.$mmSpinner = $mmSpinner;

        var ampmSpinner = $ampm.textSpinner('instance');
        var $ampmSpinner = ampmSpinner.uiSpinner;
        $ampmSpinner.addClass('ui-timespinner-ampm');
        this.$ampm = $ampm;
        this.ampmSpinner = ampmSpinner;
        this.$ampmSpinner = $ampmSpinner;

        this.$container = $container;
        this.$separator = $colon;

        this._hourOnFocus();

        this.$hh
            .on('focus.timeSpinner', function(event) {
                this.select();
                _this._hourOnFocus();
            })
            .on('blur.timeSpinner', function(event) {
                _this._setSpinners();
            });

        this.$mm
            .on('focus.timeSpinner', function(event) {
                this.select();
                _this._minuteOnFocus();
            })
            .on('blur.timeSpinner', function(event) {
                _this._setSpinners();
                _this._hourOnFocus();
            });

        this.$ampm
            .on('focus.timeSpinner', function(event) {
                this.select();
                _this._ampmOnFocus();
            })
            .on('blur.timeSpinner', function(event) {
                _this._setSpinners();
                _this._hourOnFocus();
            });

        this.options.value = this.element.val();

        this._setOptions(this.options);
    },

    _destroy: function() {
        this.element
            .insertBefore(this.$container)
            .removeClass('ui-timespinner-value')
            .show();

        this.$container.remove();
    },

    _setOption: function(key, value) {
        if (key == 'value') {
            this.options.value = value;
            this._setSpinners();
            this._setElementValue();
        } else if (key == 'ampm') {
            if (this.options.ampm != value) {
                this.options.ampm = value;
                this._setSpinners();
            }
        }

        this._super(key, value);
    },

    _setOptions: function(options) {
        this._super(options);
    },

    /**
     * Generic function to split HH:MM into parts
     *
     * @param  {String} hhmm 24hour format HH:MM string
     * @return {Object}
     */
    _hhmm: function (hhmm) {
      var tmp = hhmm.split(':');

      var hh = tmp[0];
      var h = parseInt(hh);

      var mm = tmp[1];
      var m = parseInt(mm);

      return {
          h: h,
          hh: hh,
          m: m,
          mm: mm
      };
    },

    /**
     * Returns an object of both 24hour and AM/PM format and their parts
     * based on the specified 24hour format HH:MM string
     *
     * @param  {String} hhmm 24hour format HH:MM string
     * @return {Object}
     */
    _getFormats: function (hhmm) {
       var parts = this._hhmm(hhmm);

       var h = parts.h;

       var ap = ['AM', 'PM'];
       var apm = 0;

       if (h >= 12) { // 13:00 - 23:59
           h = h - 12;
           apm = 1;
       } else if (h == 0) {
           h = 12; // 00:00
       }

       var hh = ('00' + h).substr(-2);

       var ampm = {
          h: h,
          hh: hh,

          m: parts.m,
          mm: parts.mm,

          apm: apm,
          ap: ap[apm]
       }

       return {
          hhmm: parts,
          ampm: ampm
       };
    },

    _hourOnFocus: function() {
        this.$hhSpinner.find('.ui-spinner-button').show();
        this.$mmSpinner.find('.ui-spinner-button').hide();
        this.$ampmSpinner.find('.ui-spinner-button').hide();
    },

    _minuteOnFocus: function() {
        this.$hhSpinner.find('.ui-spinner-button').hide();
        this.$ampmSpinner.find('.ui-spinner-button').hide();
        this.$mmSpinner.find('.ui-spinner-button').show();
    },

    _ampmOnFocus: function() {
        this.$hhSpinner.find('.ui-spinner-button').hide();
        this.$mmSpinner.find('.ui-spinner-button').hide();
        this.$ampmSpinner.find('.ui-spinner-button').show();
    },

    _inputOnMouseWheel: function(event) {
        var $this = $(this);

        if ($this.prop('disabled') == false) {
            if (event.originalEvent.wheelDelta > 0) {
                $this.spinner('stepUp');
            } else {
                $this.spinner('stepDown');
            }

            event.preventDefault();

            try {
                this.select();
            } catch (err) {
                // ignore
            }
        }
    },

    _inputOnKeypress: function(event) {
        return event.charCode >= 48 && event.charCode <= 57;
    },


    // refreshes the UI to reflect the internal value
    _setSpinners: function() {

        var f = this._getFormats(this.options.value);

        if (this.options.ampm) {
          this.$container.addClass('ui-timespinner-ampm');
          this.$hh.spinner('option', 'min', 1);
          this.$hh.spinner('option', 'max', 12);

          this.$hh.val(f.ampm.hh);
          this.$ampm.val(f.ampm.apm).textSpinner('value', f.ampm.apm);
        } else {
          this.$container.removeClass('ui-timespinner-ampm');
          this.$hh.spinner('option', 'min', 0);
          this.$hh.spinner('option', 'max', 23);

          this.$hh.val(f.hhmm.hh);
        }

        this.$mm.val(f.hhmm.mm);

        this._validateSpinners();
    },

    // This returns the spinner values, NOT options.value
    _getSpinnerValue: function () {
      var hh = this.$hh.spinner('value');
      var mm = this.$mm.spinner('value');
      var ampm = this.$ampm.textSpinner('value');
      var h = parseInt(hh, 10);

      if (this.options.ampm) {
          if (ampm) {
            if (h < 12) {
                h = h + 12;
            }
          } else {
            if (h == 12) {
                h = 0;
            }
          }
      }

      hh = h.toString();

      hh = ('00' + hh).substr(-2);
      mm = ('00' + mm).substr(-2);

      var ret = [hh, mm].join(':');
      return ret;
    },

    // This updates the original element's value based on the spinner values
    _setElementValue: function () {
        var hhmm = this._getSpinnerValue();
        this.options.value = hhmm;
        this.element.val(hhmm);
    },

    _validateHourSpinner: function() {
        var hh = this.$hh.spinner('value');

        var h = parseInt(hh);

        if (isNaN(h)) {
            h = 0;
        }

        if (this.options.ampm) {
            h = Math.min(12, Math.max(1, h));
        } else {
            h = Math.min(23, Math.max(0, h));
        }

        var s = ('00' + h).substr(-2);

        if (s != hh) {
            this.$hh.val(s);
            this._setElementValue();
        }
    },

    _validateMinuteSpinner: function() {
        var mm = this.$mm.spinner('value');

        var m = parseInt(mm);

        if (isNaN(m)) {
            m = 0;
        }

        m = Math.min(59, Math.max(0, m));

        var s = ('00' + m).substr(-2);

        if (s != mm) {
            this.$mm.val(s);
            this._setElementValue();
        }
    },

    _validateSpinners: function() {
      this._validateHourSpinner();
      this._validateMinuteSpinner();
    },

    enable: function() {
        this.$container.removeClass('ui-state-disabled');
        this.$hh.spinner('enable');
        this.$mm.spinner('enable');
        this.$ampm.textSpinner('enable');
    },

    disable: function() {
        this.$container.addClass('ui-state-disabled');
        this.$hh.spinner('disable');
        this.$mm.spinner('disable');
        this.$ampm.textSpinner('disable');
    },

    value: function(value) {

        // get value: ALWAYS return 24-hour format
        if (value === undefined) {
            return this._getSpinnerValue();
        }

        // set value: 'hh:mm' 24-hour format
        this._setOption('value', value);
    }

});

