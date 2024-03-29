/*!
* jQuery UI 1.8.7
*
* Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI
*/
(function($, undefined) {

    $.extend($.ui, {
        version: "1.8.7",

        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91, // COMMAND
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93, // COMMAND_RIGHT
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91 // COMMAND
        }
    });

    // plugins
    $.fn.extend({
        _focus: $.fn.calendarFocus,
        calendarFocus: function(delay, fn) {
            return typeof delay === "number" ?
			this.each(function() {
			    var elem = this;
			    setTimeout(function() {
			        $(elem).focus();
			        if (fn) {
			            fn.call(elem);
			        }
			    }, delay);
			}) :
			this._focus.apply(this, arguments);
        },

        calendarScrollParent: function() {
            var scrollParent;
            if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.curCSS(this, 'position', 1)) && (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                }).eq(0);
            }

            return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
        },

        calendarZIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }

            if (this.length) {
                var elem = $(this[0]), position, value;
                while (elem.length && elem[0] !== document) {
                    // Ignore z-index if position is set to a value where z-index is ignored by the browser
                    // This makes behavior of this function consistent across browsers
                    // WebKit always returns auto if the element is positioned
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        // IE returns 0 when zIndex is not specified
                        // other browsers return a string
                        // we ignore the case of nested elements with an explicit value of 0
                        // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }

            return 0;
        },

        calendarDisableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") +
			".datetime-ui-disableSelection", function(event) {
			    event.preventDefault();
			});
        },

        calendarEnableSelection: function() {
            return this.unbind(".datetime-ui-disableSelection");
        }
    });

    $.each(["Width", "Height"], function(i, name) {
        var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
		type = name.toLowerCase(),
		orig = {
		    innerWidth: $.fn.innerWidth,
		    innerHeight: $.fn.innerHeight,
		    outerWidth: $.fn.outerWidth,
		    outerHeight: $.fn.outerHeight
		};

        function reduce(elem, size, border, margin) {
            $.each(side, function() {
                size -= parseFloat($.curCSS(elem, "padding" + this, true)) || 0;
                if (border) {
                    size -= parseFloat($.curCSS(elem, "border" + this + "Width", true)) || 0;
                }
                if (margin) {
                    size -= parseFloat($.curCSS(elem, "margin" + this, true)) || 0;
                }
            });
            return size;
        }

        $.fn["inner" + name] = function(size) {
            if (size === undefined) {
                return orig["inner" + name].call(this);
            }

            return this.each(function() {
                $(this).css(type, reduce(this, size) + "px");
            });
        };

        $.fn["outer" + name] = function(size, margin) {
            if (typeof size !== "number") {
                return orig["outer" + name].call(this, size);
            }

            return this.each(function() {
                $(this).css(type, reduce(this, size, true, margin) + "px");
            });
        };
    });

    // selectors
    function visible(element) {
        return !$(element).parents().andSelf().filter(function() {
            return $.curCSS(this, "visibility") === "hidden" ||
			$.expr.filters.hidden(this);
        }).length;
    }

    $.extend($.expr[":"], {
        data: function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },

        focusable: function(element) {
            var nodeName = element.nodeName.toLowerCase(),
			tabIndex = $.attr(element, "tabindex");
            if ("area" === nodeName) {
                var map = element.parentNode,
				mapName = map.name,
				img;
                if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                    return false;
                }
                img = $("img[usemap=#" + mapName + "]")[0];
                return !!img && visible(img);
            }
            return (/input|select|textarea|button|object/.test(nodeName)
			? !element.disabled
			: "a" == nodeName
				? element.href || !isNaN(tabIndex)
				: !isNaN(tabIndex))
            // the element and all of its ancestors must be visible
			&& visible(element);
        },

        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex");
            return (isNaN(tabIndex) || tabIndex >= 0) && $(element).is(":focusable");
        }
    });

    // support
    $(function() {
        var body = document.body,
		div = body.appendChild(div = document.createElement("div"));

        $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });

        $.support.minHeight = div.offsetHeight === 100;
        $.support.selectstart = "onselectstart" in div;

        // set display to none to avoid a layout bug in IE
        // http://dev.jquery.com/ticket/4014
        body.removeChild(div).style.display = "none";
    });





    // deprecated
    $.extend($.ui, {
        // $.ui.plugin is deprecated.  Use the proxy pattern instead.
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for (var i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, args) {
                var set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode) {
                    return;
                }

                for (var i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },

        // will be deprecated when we switch to jQuery 1.4 - use jQuery.contains()
        contains: function(a, b) {
            return document.compareDocumentPosition ?
			a.compareDocumentPosition(b) & 16 :
			a !== b && a.contains(b);
        },

        // only used by resizable
        hasScroll: function(el, a) {

            //If overflow is hidden, the element might have extra content, but the user wants to hide it
            if ($(el).css("overflow") === "hidden") {
                return false;
            }

            var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
			has = false;

            if (el[scroll] > 0) {
                return true;
            }

            // TODO: determine which cases actually cause this to happen
            // if the element doesn't have the scroll set, see if it's possible to
            // set the scroll
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        },

        // these are odd functions, fix the API or move into individual plugins
        isOverAxis: function(x, reference, size) {
            //Determines when x coordinate is over "b" element axis
            return (x > reference) && (x < (reference + size));
        },
        isOver: function(y, x, top, left, height, width) {
            //Determines when x, y coordinates is over "b" element
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
        }
    });

})($cmsj);
/*
* jQuery UI Datepicker 1.8.7
*
* Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Datepicker
*
* Depends:
*	jquery.ui.core.js
*/
(function($, undefined) {

    $.extend($.ui, { datepicker: { version: "1.8.7"} });

    var PROP_NAME = 'datepicker';
    var dpuuid = new Date().getTime();

    /* Date picker manager.
    Use the singleton instance of this class, $.cmsdatepicker, to interact with the date picker.
    Settings for (groups of) date pickers are maintained in an instance object,
    allowing multiple different settings on the same page. */

    function CMSDatepicker() {
        this.debug = false; // Change this to true to start debugging
        this._curInst = null; // The current instance in use
        this._keyEvent = false; // If the last event was a key event
        this._disabledInputs = []; // List of date picker inputs that have been disabled
        this._datepickerShowing = false; // True if the popup picker is showing , false if not
        this._inDialog = false; // True if showing within a "dialog", false if not
        this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
        this._inlineClass = 'datetime-ui-datepicker-inline'; // The name of the inline marker class
        this._appendClass = 'datetime-ui-datepicker-append'; // The name of the append marker class
        this._triggerClass = 'datetime-ui-datepicker-trigger'; // The name of the trigger marker class
        this._dialogClass = 'datetime-ui-datepicker-dialog'; // The name of the dialog marker class
        this._disableClass = 'datetime-ui-datepicker-disabled'; // The name of the disabled covering marker class
        this._unselectableClass = 'datetime-ui-datepicker-unselectable'; // The name of the unselectable cell marker class
        this._currentClass = 'datetime-ui-datepicker-current-day'; // The name of the current day marker class
        this._dayOverClass = 'datetime-ui-datepicker-days-cell-over'; // The name of the day hover marker class
        this.regional = []; // Available regional settings, indexed by language code
        this.regional[''] = { // Default regional settings
            closeText: 'Done', // Display text for close link
            prevText: 'Prev', // Display text for previous month link
            nextText: 'Next', // Display text for next month link
            currentText: 'Today', // Display text for current month link
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'], // Names of months for drop-down and formatting
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Column headings for days starting at Sunday
            weekHeader: 'Wk', // Column header for week of the year
            dateFormat: 'mm/dd/yy', // See format options on parseDate
            firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
            isRTL: false, // True if right-to-left language, false if left-to-right
            showMonthAfterYear: false, // True if the year select precedes month, false for month then year
            yearSuffix: '', // Additional text to append to the year in the month headers
            AMDesignator: 'AM', // AM designator for 12 hour mode
            PMDesignator: 'PM',  // PM designator for 12 hour mode
            NAText: 'N/A' // Not avaible text
        };
        this._defaults = { // Global defaults for all the date picker instances
            showOn: 'focus', // 'focus' for popup on focus,
            // 'button' for trigger button, or 'both' for either
            showAnim: 'fadeIn', // Name of jQuery animation for popup
            showOptions: {}, // Options for enhanced animations
            defaultDate: null, // Used when field is blank: actual date,
            // +/-number for offset from today, null for today
            appendText: '', // Display text following the input box, e.g. showing the format
            buttonText: '...', // Text for trigger button
            buttonImage: '', // URL for trigger button image
            buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
            hideIfNoPrevNext: false, // True to hide next/previous month links
            // if not applicable, false to just disable them
            navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
            gotoCurrent: false, // True if today link goes back to current selection instead
            changeMonth: false, // True if month can be selected directly, false if only prev/next
            changeYear: false, // True if year can be selected directly, false if only prev/next
            yearRange: 'c-10:c+10', // Range of years to display in drop-down,
            // either relative to today's year (-nn:+nn), relative to currently displayed year
            // (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
            showOtherMonths: false, // True to show dates in other months, false to leave blank
            selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
            showWeek: false, // True to show week of the year, false to not show it
            calculateWeek: this.iso8601Week, // How to calculate the week of the year,
            // takes a Date and returns the number of the week for it
            shortYearCutoff: '+10', // Short year values < this are in the current century,
            // > this are in the previous century,
            // string value starting with '+' for current year + value
            minDate: null, // The earliest selectable date, or null for no limit
            maxDate: null, // The latest selectable date, or null for no limit
            duration: 'fast', // Duration of display/closure
            beforeShowDay: null, // Function that takes a date and returns an array with
            // [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
            // [2] = cell title (optional), e.g. $.cmsdatepicker.noWeekends
            beforeShow: null, // Function that takes an input field and
            // returns a set of custom settings for the date picker
            onSelect: null, // Define a callback function when a date is selected
            onChangeMonthYear: null, // Define a callback function when the month or year is changed
            onClose: null, // Define a callback function when the datepicker is closed
            numberOfMonths: 1, // Number of months to show at a time
            showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
            stepMonths: 1, // Number of months to step back/forward
            stepBigMonths: 12, // Number of months to step back/forward for the big links
            altField: '', // Selector for an alternate field to store selected dates into
            altFormat: '', // The date format to use for the alternate field
            constrainInput: true, // The input is constrained by the current date format
            showButtonPanel: false, // True to show button panel, false to not show it
            autoSize: false, // True to size the input for the date format, false to leave as is
            numberOfRows: 0, // Direct set of rows count		
            showTimePanel: false, // Indicates whether show time panel buttons
            use24HourMode: true, // If true time picker uses 24 - hour mode
            actionPanelButtons: ['ok', 'now'], // Buttons to show
            hideOnDateSelection: true, // If click hides the calendar
            displaySeconds: true,   // If show second textbox
            selectByIcon: true, // If true calendar is shown by icon click
            disableDaySelect: false, // If true day selection is disabled
            disableMontSelect: false, // If true month selection is disabled
            defaultTimeValue: 0, // 0..now,1.. start of day, 2 .. end of day
            timeZoneOffset: 0, // Offset of time zone relative to UTC
            applyTimeZones: false, // If true time zone offset is applied
            highlightCurrentDay: false // If true current day is highlighted
        };
        $.extend(this._defaults, this.regional['']);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="datetime-ui-datepicker datetime-ui-widget datetime-ui-widget-content datetime-ui-helper-clearfix datetime-ui-corner-all" style="display:none" ></div>');
    }

    $.extend(CMSDatepicker.prototype, {
        /* Class name added to elements to indicate already configured with a date picker. */
        markerClassName: 'hasDatepicker',

        /* Debug logging (if enabled). */
        log: function() {
            if (this.debug)
                console.log.apply('', arguments);
        },

        // TODO rename to "widget" when switching to widget factory
        _widgetDatepicker: function() {
            return this.dpDiv;
        },

        /* Override the default settings for all instances of the date picker.
        @param  settings  object - the new settings to use as defaults (anonymous object)
        @return the manager object */
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },

        /* Attach the date picker to a jQuery selection.
        @param  target    element - the target input field or division or span
        @param  settings  object - the new settings to use for this date picker instance (anonymous) */
        _attachDatepicker: function(target, settings) {
            // check for settings on the control itself - in namespace 'date:'
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('date:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');
            if (!target.id) {
                this.uuid += 1;
                target.id = 'dp' + this.uuid;
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == 'input') {
                this._connectDatepicker(target, inst);
            } else if (inline) {
                this._inlineDatepicker(target, inst);
            }
        },

        /* Create a new instance object. */
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
            return { id: id, input: target, // associated target
                selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
                drawMonth: 0, drawYear: 0, // month being drawn
                inline: inline, // is datepicker inline or not
                dpDiv: (!inline ? this.dpDiv : // presentation div
			$('<div class="' + this._inlineClass + ' datetime-ui-datepicker datetime-ui-widget datetime-ui-widget-content datetime-ui-helper-clearfix datetime-ui-corner-all"></div>'))
            };
        },

        /* Attach the date picker to an input field. */
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName))
                return;
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp).
			bind("setData.cmsdatepicker", function(event, key, value) {
			    inst.settings[key] = value;
			}).bind("getData.cmsdatepicker", function(event, key) {
			    return this._get(inst, key);
			});

            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
        },

        /* Make attachments based on settings. */
        _attachments: function(input, inst) {
            var appendText = this._get(inst, 'appendText');
            var isRTL = this._get(inst, 'isRTL');
            if (inst.append)
                inst.append.remove();
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
                input[isRTL ? 'before' : 'after'](inst.append);
            }
            input.unbind('focus', this._showDatepicker);
            if (inst.trigger)
                inst.trigger.remove();
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
                input.focus(this._showDatepicker);
            if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
                var image = this._get(inst, 'IconID');
                var image_obj = $("#" + image);

                if (!input.is(':disabled')) {
                    image_obj.bind('click', function() {
                        $.cmsdatepicker._showDatepicker(input[0]); return false;
                    });
                }
            }
        },
        
        /* Apply the maximum length for the date format. */
        _autoSize: function(inst) {
            if (this._get(inst, 'autoSize') && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20); // Ensure double digits
                var dateFormat = this._get(inst, 'dateFormat');
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function(names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					'monthNames' : 'monthNamesShort'))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
                }
                inst.input.attr('size', this._formatDate(inst, date).length);
            }
        },

        /* Attach an inline date picker to a div. */
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).
			bind("setData.cmsdatepicker", function(event, key, value) {
			    inst.settings[key] = value;
			}).bind("getData.cmsdatepicker", function(event, key) {
			    return this._get(inst, key);
			});
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            inst.dpDiv.show();
        },

        /* Pop-up the date picker in a "dialog" box.
        @param  input     element - ignored
        @param  date      string or Date - the initial date to display
        @param  onSelect  function - the function to call when a date is selected
        @param  settings  object - update the dialog date picker instance's settings (anonymous object)
        @param  pos       int[2] - coordinates for the dialog's position within the screen or
        event - with x/y coordinates or
        leave empty for default (screen centre)
        @return the manager object */
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var inst = this._dialogInst; // internal instance
            if (!inst) {
                this.uuid += 1;
                var id = 'dp' + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id +
				'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $('body').append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);

            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }

            // move input on screen for focus, but hidden behind dialog
            this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI)
                $.blockUI(this.dpDiv);
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },

        /* Detach a datepicker from its control.
        @param  target    element - the target input field or division or span */
        _destroyDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == 'input') {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).
				unbind('focus', this._showDatepicker).
				unbind('keydown', this._doKeyDown).
				unbind('keypress', this._doKeyPress).
				unbind('keyup', this._doKeyUp);
            } else if (nodeName == 'div' || nodeName == 'span')
                $target.removeClass(this.markerClassName).empty();
        },

        /* Enable the date picker to a jQuery selection.
        @param  target    element - the target input field or division or span */
        _enableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = false;
                inst.trigger.filter('button').
				each(function() { this.disabled = false; }).end().
				filter('img').css({ opacity: '1.0', cursor: '' });
            }
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().removeClass('datetime-ui-state-disabled');
            }
            this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
        },

        /* Disable the date picker to a jQuery selection.
        @param  target    element - the target input field or division or span */
        _disableDatepicker: function(target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = true;
                inst.trigger.filter('button').
				each(function() { this.disabled = true; }).end().
				filter('img').css({ opacity: '0.5', cursor: 'default' });
            }
            else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().addClass('datetime-ui-state-disabled');
            }
            this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value == target ? null : value); }); // delete entry
            this._disabledInputs[this._disabledInputs.length] = target;
        },

        /* Is the first field in a jQuery collection disabled as a datepicker?
        @param  target    element - the target input field or division or span
        @return boolean - true if disabled, false if enabled */
        _isDisabledDatepicker: function(target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target)
                    return true;
            }
            return false;
        },

        /* Retrieve the instance data for the target control.
        @param  target  element - the target input field or division or span
        @return  object - the associated instance data
        @throws  error if a jQuery problem getting data */
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME);
            }
            catch (err) {
                throw 'Missing instance data for this datepicker';
            }
        },

        /* Update or retrieve the settings for a date picker attached to an input field or division.
        @param  target  element - the target input field or division or span
        @param  name    object - the new settings to update or
        string - the name of the setting to change or retrieve,
        when retrieving also 'all' for all instance settings or
        'defaults' for all global defaults
        @param  value   any - the new value for the setting
        (omit if above is an object or to retrieve a value) */
        _optionDatepicker: function(target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == 'string') {
                return (name == 'defaults' ? $.extend({}, $.cmsdatepicker._defaults) :
				(inst ? (name == 'all' ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
            }
            var settings = name || {};
            if (typeof name == 'string') {
                settings = {};
                settings[name] = value;
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker();
                }

                var date = this._getDateDatepicker(target, true);
                extendRemove(inst.settings, settings);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDateDatepicker(target, date);
                this._updateDatepicker(inst);
            }
        },

        // change method deprecated
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value);
        },

        /* Redraw the date picker attached to an input field or division.
        @param  target  element - the target input field or division or span */
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst);
            }
        },

        /* Set the dates for a jQuery selection.
        @param  target   element - the target input field or division or span
        @param  date     Date - the new date */
        _setDateDatepicker: function(target, date) {

            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst);
            }
        },

        _showDatepicker: function(target) {
            $.cmsdatepicker._showDatepicker($(target)[0]);
        },

        _setLocationDatepicker: function(target, id) {
            var position = $cmsj("#" + id).offset();
            $.cmsdatepicker._pos = [position.left, position.top + 20];
        },

        /* Set the date for calendar but without change of textbox 
        @param  target   element - the target input field or division or span
        @param  date     Date - the new date */
        _setDateNoTextBoxDatepicker: function(target, date) {
            var inst = this._getInst(target);
            this._setDate(inst, date, false);

        },
        
        /* Get the date(s) for the first entry in a jQuery selection.
        @param  target     element - the target input field or division or span
        @param  noDefault  boolean - true if no default date is to be used
        @return Date - the current date */
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline)
                this._setDateFromField(inst, noDefault);
            return (inst ? this._getDate(inst) : null);
        },

        _getFormattedDateDatepicker: function(target) {
            var inst = this._getInst(target);
            return this._getFormattedDate(inst);
        },

        /* Handle keystrokes. */
        _doKeyDown: function(event) {
            var inst = $.cmsdatepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is('.datetime-ui-datepicker-rtl');
            inst._keyEvent = true;
            if ($.cmsdatepicker._datepickerShowing)
                switch (event.keyCode) {
                case 9: $.cmsdatepicker._hideDatepicker();
                    handled = false;
                    break; // hide on tab out
                case 13: var sel = $('td.' + $.cmsdatepicker._dayOverClass + ':not(.' +
									$.cmsdatepicker._currentClass + ')', inst.dpDiv);
                    if (sel[0])
                        $.cmsdatepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                    else
                        $.cmsdatepicker._hideDatepicker();
                    return false; // don't submit the form
                    break; // select the value on enter
                case 27: $.cmsdatepicker._hideDatepicker();
                    break; // hide on escape
                case 33: $.cmsdatepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.cmsdatepicker._get(inst, 'stepBigMonths') :
							-$.cmsdatepicker._get(inst, 'stepMonths')), 'M');
                    break; // previous month/year on page up/+ ctrl
                case 34: $.cmsdatepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.cmsdatepicker._get(inst, 'stepBigMonths') :
							+$.cmsdatepicker._get(inst, 'stepMonths')), 'M');
                    break; // next month/year on page down/+ ctrl
                case 35: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._clearDate(event.target);
                    handled = event.ctrlKey || event.metaKey;
                    break; // clear on ctrl or command +end
                case 36: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._gotoToday(event.target);
                    handled = event.ctrlKey || event.metaKey;
                    break; // current on ctrl or command +home
                case 37: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
                    handled = event.ctrlKey || event.metaKey;
                    // -1 day on ctrl or command +left
                    if (event.originalEvent.altKey) $.cmsdatepicker._adjustDate(event.target, (event.ctrlKey ?
									-$.cmsdatepicker._get(inst, 'stepBigMonths') :
									-$.cmsdatepicker._get(inst, 'stepMonths')), 'M');
                    // next month/year on alt +left on Mac
                    break;
                case 38: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._adjustDate(event.target, -7, 'D');
                    handled = event.ctrlKey || event.metaKey;
                    break; // -1 week on ctrl or command +up
                case 39: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
                    handled = event.ctrlKey || event.metaKey;
                    // +1 day on ctrl or command +right
                    if (event.originalEvent.altKey) $.cmsdatepicker._adjustDate(event.target, (event.ctrlKey ?
									+$.cmsdatepicker._get(inst, 'stepBigMonths') :
									+$.cmsdatepicker._get(inst, 'stepMonths')), 'M');
                    // next month/year on alt +right
                    break;
                case 40: if (event.ctrlKey || event.metaKey) $.cmsdatepicker._adjustDate(event.target, +7, 'D');
                    handled = event.ctrlKey || event.metaKey;
                    break; // +1 week on ctrl or command +down
                default: handled = false;
            }
            else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
                $.cmsdatepicker._showDatepicker(this);
            else {
                handled = false;
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },

        /* Filter entered characters - based on date format. */
        _doKeyPress: function(event) {
            var inst = $.cmsdatepicker._getInst(event.target);
            if ($.cmsdatepicker._get(inst, 'constrainInput')) {
                var chars = $.cmsdatepicker._possibleChars($.cmsdatepicker._get(inst, 'dateFormat'));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
            }
        },

        /* Synchronise manual entry and field/alternate field. */
        _doKeyUp: function(event) {
            var inst = $.cmsdatepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.cmsdatepicker.parseDate($.cmsdatepicker._get(inst, 'dateFormat'),
					(inst.input ? inst.input.val() : null),
					$.cmsdatepicker._getFormatConfig(inst));
                    if (date) { // only if valid
                        $.cmsdatepicker._setDateFromField(inst);
                        $.cmsdatepicker._updateAlternate(inst);
                        $.cmsdatepicker._updateDatepicker(inst);
                    }
                }
                catch (event) {
                    $.cmsdatepicker.log(event);
                }
            }
            return true;
        },

        /* Pop-up the date picker for a given input field.
        @param  input  element - the input field attached to the date picker or
        event - if triggered by focus */
        _showDatepicker: function(input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
                input = $('input', input.parentNode)[0];
            if ($.cmsdatepicker._isDisabledDatepicker(input) || $.cmsdatepicker._lastInput == input) // already here
                return;
            var inst = $.cmsdatepicker._getInst(input);
            if ($.cmsdatepicker._curInst && $.cmsdatepicker._curInst != inst) {
                $.cmsdatepicker._curInst.dpDiv.stop(true, true);
            }
            var beforeShow = $.cmsdatepicker._get(inst, 'beforeShow');
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.cmsdatepicker._lastInput = input;
            $.cmsdatepicker._setDateFromField(inst);
            if ($.cmsdatepicker._inDialog) // hide cursor
                input.value = '';
            if (!$.cmsdatepicker._pos) { // position below input
                $.cmsdatepicker._pos = $.cmsdatepicker._findPos(input);
                $.cmsdatepicker._pos[1] += input.offsetHeight; // add the height
            }
            var isFixed = false;
            $(input).parents().each(function() {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed;
            });
            if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
                $.cmsdatepicker._pos[0] -= document.documentElement.scrollLeft;
                $.cmsdatepicker._pos[1] -= document.documentElement.scrollTop;
            }
            var offset = { left: $.cmsdatepicker._pos[0], top: $.cmsdatepicker._pos[1] };
            $.cmsdatepicker._pos = null;
            //to avoid flashes on Firefox
            inst.dpDiv.empty();
            // determine sizing offscreen
            inst.dpDiv.css({ position: 'absolute', display: 'block', top: '-1000px' });
            $.cmsdatepicker._updateDatepicker(inst);
            // fix width for dynamic number of date pickers
            // and adjust position before showing
            offset = $.cmsdatepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({ position: ($.cmsdatepicker._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
                left: offset.left + 'px', top: offset.top + 'px'
            });
            if (!inst.inline) {
                var showAnim = $.cmsdatepicker._get(inst, 'showAnim');
                var duration = $.cmsdatepicker._get(inst, 'duration');
                var postProcess = function() {
                    $.cmsdatepicker._datepickerShowing = true;
                    var cover = inst.dpDiv.find('iframe.datetime-ui-datepicker-cover'); // IE6- only
                    if (!!cover.length) {
                        var borders = $.cmsdatepicker._getBorders(inst.dpDiv);
                        cover.css({ left: -borders[0], top: -borders[1],
                            width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()
                        });
                    }
                };
                inst.dpDiv.calendarZIndex(50000);
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.show(showAnim, $.cmsdatepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
                if (!showAnim || !duration)
                    postProcess();
                if (inst.input.is(':visible') && !inst.input.is(':disabled'))
                    inst.input.focus();
                $.cmsdatepicker._curInst = inst;
            }

            var applyTimeZones = this._get(inst, 'applyTimeZones');

            /* If time in the input text box is not valid and
               time zones are disabled (offset between client time zone
               and server time zone is not known) make callback to set correct current time */
            if (!$.cmsdatepicker._isInputDateTimeValid(inst) && !applyTimeZones) {
                window["SelectModalDate_" + inst.id]('now', inst.id);
            }
        },

        /* Checks if time in input text box is valid */
        _isInputDateTimeValid: function (inst) {
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var settings = this._getFormatConfig(inst);
            var date;
            try {
                date = this.parseDate(dateFormat, dates, settings);
            } catch (event) {
                return false;
            }
            if (date) {
                return true;
            }
            return false;
        },

        /* Generate the date picker content. */
        _updateDatepicker: function(inst) {
            var self = this;
            var borders = $.cmsdatepicker._getBorders(inst.dpDiv);
            inst.dpDiv.empty().append(this._generateHTML(inst));
            var cover = inst.dpDiv.find('iframe.datetime-ui-datepicker-cover'); // IE6- only
            if (!!cover.length) { //avoid call to outerXXXX() when not in IE6
                cover.css({ left: -borders[0], top: -borders[1], width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight() });
            }
            inst.dpDiv.find('.datetime-ui-datepicker-prev, .datetime-ui-datepicker-next, .datetime-ui-datepicker-calendar td a')
				.bind('mouseout', function() {
                $(this).removeClass('datetime-ui-state-hover');
                    if (this.className.indexOf('datetime-ui-datepicker-prev') != -1) $(this).removeClass('datetime-ui-datepicker-prev-hover');
                    if (this.className.indexOf('datetime-ui-datepicker-next') != -1) $(this).removeClass('datetime-ui-datepicker-next-hover');
				})
				.bind('mouseover', function() {
				    if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
				        $(this).parents('.datetime-ui-datepicker-calendar').find('a').removeClass('datetime-ui-state-hover');
				        $(this).addClass('datetime-ui-state-hover');
				        if (this.className.indexOf('datetime-ui-datepicker-prev') != -1) $(this).addClass('datetime-ui-datepicker-prev-hover');
				        if (this.className.indexOf('datetime-ui-datepicker-next') != -1) $(this).addClass('datetime-ui-datepicker-next-hover');
				    }
				})
			.end()
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1)
                inst.dpDiv.addClass('datetime-ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
            else
                inst.dpDiv.removeClass('datetime-ui-datepicker-multi-2 datetime-ui-datepicker-multi-3 datetime-ui-datepicker-multi-4').width('');
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('datetime-ui-datepicker-multi');
            inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('datetime-ui-datepicker-rtl');

            // render of the years select (to avoid flashes on Firefox) 
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                    //assure that inst.yearshtml didn't change.
                    if (origyearshtml === inst.yearshtml) {
                        inst.dpDiv.find('select.datetime-ui-datepicker-year:first').replaceWith(inst.yearshtml);
                    }
                    origyearshtml = inst.yearshtml = null;
            }
        },

        /* Retrieve the size of left and top borders for an element.
        @param  elem  (jQuery object) the element of interest
        @return  (number[2]) the left and top borders */
        _getBorders: function(elem) {
            var convert = function(value) {
                return { thin: 1, medium: 2, thick: 3}[value] || value;
            };
            return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
        },

        /* Check positioning to remain on screen. */
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

            offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

            // now check if datepicker is showing outside window viewport - move to a better place if so.
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

            return offset;
        },

        /* Find an object's position on the screen. */
        _findPos: function(obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, 'isRTL');
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
                obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },

        /* Hide the date picker from view.
        @param  input  element - the input field attached to the date picker */
        _hideDatepicker: function(input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME)))
                return;
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, 'showAnim');
                var duration = this._get(inst, 'duration');
                var postProcess = function() {
                    $.cmsdatepicker._tidyDialog(inst);
                    this._curInst = null;
                };
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.hide(showAnim, $.cmsdatepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
                if (!showAnim)
                    postProcess();
                var onClose = this._get(inst, 'onClose');
                if (onClose)
                    onClose.apply((inst.input ? inst.input[0] : null),
					[(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
        },

        /* Tidy up after a dialog display. */
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind('.datetime-ui-datepicker-calendar');
        },

        /* Close date picker if clicked elsewhere. */
        _checkExternalClick: function(event) {
            if (!$.cmsdatepicker._curInst)
                return;
            var $target = $(event.target);
            var iconID = $.cmsdatepicker._curInst.settings.IconID;

            if ($target[0].id != $.cmsdatepicker._mainDivId && $target[0].id != iconID &&
				$target.parents('#' + $.cmsdatepicker._mainDivId).length == 0 &&
				!$target.hasClass($.cmsdatepicker.markerClassName) &&
				!$target.hasClass($.cmsdatepicker._triggerClass) &&
				$.cmsdatepicker._datepickerShowing && !($.cmsdatepicker._inDialog && $.blockUI))
                $.cmsdatepicker._hideDatepicker();
        },

        /* Adjust one of the date sub-fields. */
        _adjustDate: function(id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset +
			(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
            this._updateDatepicker(inst);
        },

        /* Action for current link. */
        _gotoToday: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            }
            else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },

        /* Action for selecting a new month/year. */
        _selectMonthYear: function(id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
		inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
			parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target);
        },

        /* Restore input focus after not changing month/year. */
        _clickMonthYear: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear) {
                setTimeout(function() {
                    inst.input.focus();
                }, 0);
            }
            inst._selectingMonthYear = !inst._selectingMonthYear;
        },

        /* Action for selecting a day. */
        _selectDay: function(id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return;
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $('a', td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;

            this._setCurrentTime(inst);

            if (this._get(inst, 'hideOnDateSelection')) {
                this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            }
            else {
                this._updateDatepicker(inst);
            }
        },

        /* Set current time from textbox  values */
        _setCurrentTime: function(inst) {
            // Return hours
            var hours = 0;
            var minutes = 0;
            var seconds = 0;
            if (this._get(inst, 'showTimePanel')) {
                hours = parseInt($("#" + inst.id + "_hour").val(), 10);
                minutes = parseInt($("#" + inst.id + "_minute").val(), 10);
                seconds = parseInt($("#" + inst.id + "_second").val(), 10);

                if (!this._get(inst, 'use24HourMode')) {
                    var hourShift = $("#" + inst.id + "_hourShift").val();
                    if (hourShift == 'pm' && hours < 12) {
                        hours = hours + 12;
                    }
                    if (hourShift == 'am' && hours == 12) {
                        hours = 0;
                    }

                }
            }

            // Test hours = ok
            if (isNaN(hours)) {
                hours = 0;
            }

            if (isNaN(minutes)) {
                minutes = 0;
            }

            if (isNaN(seconds)) {
                seconds = 0;
            }

            inst.currentHour = hours;
            inst.currentMinute = minutes;
            inst.currentSecond = seconds;
        },

        _saveAndClose: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(id, this._formatDate(inst, inst.selectedDay, inst.selectedMonth, inst.selectedYear));
        },


        /* Erase the input field and hide the date picker. */
        _clearDate: function(id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, '');
        },

        /* Update the input field with the selected date. */
        _selectDate: function(id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input)
                inst.input.val(dateStr);
            this._updateAlternate(inst);
            var onSelect = this._get(inst, 'onSelect');
            if (onSelect)
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
            else if (inst.input)
                inst.input.trigger('change'); // fire the change event
            if (inst.inline)
                this._updateDatepicker(inst);
            else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != 'object')
                    inst.input.focus(); // restore focus
                this._lastInput = null;
            }
        },

        /* Update any alternate field to synchronise with the main field. */
        _updateAlternate: function(inst) {
            var altField = this._get(inst, 'altField');
            if (altField) { // update alternate field too
                var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function() { $(this).val(dateStr); });
            }
        },

        /* Set as beforeShowDay function to prevent selection of weekends.
        @param  date  Date - the date to customise
        @return [boolean, string] - is this date selectable?, what is its CSS class? */
        noWeekends: function(date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ''];
        },

        /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
        @param  date  Date - the date to get the week for
        @return  number - the number of the week within the year that contains this date */
        iso8601Week: function(date) {
            var checkDate = new Date(date.getTime());
            // Find Thursday of this week starting on Monday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0); // Compare with Jan 1
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        },

        /* Parse a string value into a date object.
        See formatDate below for the possible formats.

	   @param  format    string - the expected format of the date
        @param  value     string - the date in the above format
        @param  settings  Object - attributes include:
        shortYearCutoff  number - the cutoff year for determining the century (optional)
        dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
        dayNames         string[7] - names of the days from Sunday (optional)
        monthNamesShort  string[12] - abbreviated names of the months (optional)
        monthNames       string[12] - names of the months (optional)
        @return  Date - the extracted date value or null if value is blank */
        parseDate: function(format, value, settings) {

            if (format == null || value == null)
                throw 'Invalid arguments';
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var PMDesignator = (settings ? settings.PMDesignator : null);
            var AMDesignator = (settings ? settings.AMDesignator : null);
            var year = -1;
            var month = -1;
            var hour = 0;
            var minute = 0;
            var second = 0;
            var day = -1;
            var doy = -1;
            var hourShift = '';
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            // Extract a number from the string value
            var getNumber = function(match) {
                var isDoubled = lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 :
				(match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    return 0;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            // Extract a name from the string value and convert to an index
            var getName = function(match, shortNames, longNames) {
                var names = (lookAhead(match) ? longNames : shortNames);
                for (var i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                throw 'Unknown name at position ' + iValue;
            };
            // Confirm that a literal character matches the string value
            var checkLiteral = function() {
                if (value.charAt(iValue) == format.charAt(iFormat))
                    iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    checkLiteral();
                else
                    switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', dayNamesShort, dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        if (!lookAhead('m'))
                            month = getNumber('m');
                        else {
                            minute = getNumber('mm');
                        }
                        break;
                    case 'M':
                        month = getNumber('M');
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case 'H':
                    case 'h':
                        hour = getNumber(format.charAt(iFormat));
                        break;
                    case 's':
                        second = getNumber('s');
                        break;

                    case 't':
                        if (lookAhead('t')) {
                            //var hourShift = value.substr(iValue, value.length - iValue);
                            var hourShift = '';
                            var ch = value[iValue];
                            while (ch != ' ') {
                                hourShift += ch;
                                if (iValue >= value.length - 1)
                                    break;
                                ch = value[++iValue];
                            }

                        }
                        break;
                    case '@':
                        var date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else
                            literal = true;
                        break;
                    default:
                        checkLiteral();
                }
            }
            if (year == -1)
                year = new Date().getFullYear();
            else if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }

            //var date = this._daylightSavingAdjust(new Date(year, month - 1, day, hour, minute, 0, 0));
            if (hourShift == PMDesignator && PMDesignator != '' && hour < 12) {
                hour += 12;
            }
            if (hourShift == AMDesignator && AMDesignator != '' && hour == 12) {
                hour = 0;
            }

            var date = new Date(year, month - 1, day, hour, minute, second, 0);

            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                if (settings.throwOnParseError) {
                    throw "Invalid date format";
                } else {
                    date = new Date();
                }
            }
            return date;
        },

        /* Standard date formats. */
        ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
        COOKIE: 'D, dd M yy',
        ISO_8601: 'yy-mm-dd',
        RFC_822: 'D, d M y',
        RFC_850: 'DD, dd-M-y',
        RFC_1036: 'D, d M y',
        RFC_1123: 'D, d M yy',
        RFC_2822: 'D, d M yy',
        RSS: 'D, d M y', // RFC 822
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yy-mm-dd', // ISO 8601

        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

        /* Format a date object into a string value.
        The format can be combinations of the following:
        d  - day of month (no leading zero)
        dd - day of month (two digit)
        o  - day of year (no leading zeros)
        oo - day of year (three digit)
        D  - day name short
        DD - day name long
        m  - month of year (no leading zero)
        mm - month of year (two digit)
        M  - month name short
        MM - month name long
        y  - year (two digit)
        yy - year (four digit)
        @ - Unix timestamp (ms since 01/01/1970)
        ! - Windows ticks (100ns since 01/01/0001)
        '...' - literal text
        '' - single quote

	   @param  format    string - the desired format of the date
        @param  date      Date - the date value to format
        @param  settings  Object - attributes include:
        dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
        dayNames         string[7] - names of the days from Sunday (optional)
        monthNamesShort  string[12] - abbreviated names of the months (optional)
        monthNames       string[12] - names of the months (optional)
        @return  string - the date in the above format */
        formatDate: function(format, date, settings) {
            if (!date)
                return '';
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var PMDesignator = (settings ? settings.PMDesignator : null);
            var AMDesignator = (settings ? settings.AMDesignator : null);
            var hourShift = AMDesignator;

            // Check whether a format character is doubled
            var lookAhead = function(match, move) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches && move)
                    iFormat++;
                return matches;
            };
            // Format a number, with leading zero if necessary
            var formatNumber = function(match, value, len) {
                var num = '' + value;
                if (lookAhead(match, true))
                    while (num.length < len)
                    num = '0' + num;
                return num;
            };
            // Format a name, short or long as requested
            var formatName = function(match, value, shortNames, longNames) {
                return (lookAhead(match, true) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'", true))
                    literal = false;
                else
                    output += format.charAt(iFormat);
                else
                    switch (format.charAt(iFormat)) {
                    case 'd':
                        output += formatNumber('d', date.getDate(), 2);
                        break;
                    case 'D':
                        output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                        break;
                    case 'o':
                        output += formatNumber('o',
								(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                        break;
                    case 'm':
                        if (lookAhead('m', false)) {
                            output += formatNumber('m', date.getMinutes(), 2);
                        }
                        else {
                            output += formatNumber('m', date.getMonth() + 1, 2);
                        }
                        break;
                    case 'M':
                        output += formatNumber('M', date.getMonth() + 1, 2);
                        break;
                    case 'y':
                        output += (lookAhead('y', true) ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                        break;
                    case 'H':
                    case 'h':
                        // format contains AM/PM designator
                        var hours = date.getHours();
                        if (format.indexOf('tt') != -1) {
                            if (hours > 12) {
                                hourShift = PMDesignator;
                                hours = hours - 12;
                            }
                            else
                                if (hours == 12)
                                hourShift = PMDesignator;
                            else
                                if (hours == 0)
                                hours = 12;
                        }
                        output += formatNumber(format.charAt(iFormat), hours, 2);
                        break;
                    case 't':
                        if (lookAhead('t', true)) {
                            output += hourShift;
                        }
                        break;
                    case 's':
                        if (lookAhead('s', false)) {
                            output += formatNumber('s', date.getSeconds(), 2);
                        }
                        break;
                    case '@':
                        output += date.getTime();
                        break;
                    case '!':
                        output += date.getTime() * 10000 + this._ticksTo1970;
                        break;
                    case "'":
                        if (lookAhead("'", true))
                            output += "'";
                        else
                            literal = true;
                        break;
                    default:
                        output += format.charAt(iFormat);
                }
            }
            return output;
        },

        /* Extract all possible characters from the date format. */
        _possibleChars: function(format) {
            var chars = '';
            var literal = false;
            // Check whether a format character is doubled
            var lookAhead = function(match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                literal = false;
            else
                chars += format.charAt(iFormat);
            else
                switch (format.charAt(iFormat)) {
                case 'd': case 'm': case 'y': case '@':
                    chars += '0123456789';
                    break;
                case 'D': case 'M':
                    return null; // Accept anything
                case "'":
                    if (lookAhead("'"))
                        chars += "'";
                    else
                        literal = true;
                    break;
                default:
                    chars += format.charAt(iFormat);
            }
            return chars;
        },

        /* Get a setting value, defaulting if necessary. */
        _get: function(inst, name) {
            return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
        },

        /* Parse existing date and initialise date picker. */
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return;
            }
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                this.log(event);
                dates = (noDefault ? '' : dates);
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : defaultDate.getDate());
            inst.currentMonth = (dates ? date.getMonth() : defaultDate.getMonth());
            inst.currentYear = (dates ? date.getFullYear() : defaultDate.getFullYear());
            inst.currentHour = (dates ? date.getHours() : defaultDate.getHours());
            inst.currentMinute = (dates ? date.getMinutes() : defaultDate.getMinutes());
            inst.currentSecond = (dates ? date.getSeconds() : defaultDate.getSeconds());

            this._adjustInstDate(inst);
        },

        /* Retrieve the default date shown on opening. */
        _getDefaultDate: function(inst) {
            var defaultDate = this._get(inst, 'defaultDate');
            var defaultTimeValue = this._get(inst, 'defaultTimeValue');

            var now = new Date();
            if ((defaultDate != null) && (typeof (defaultDate) == 'string')) {
                var dateFormat = this._get(inst, 'dateFormat');
                var settings = this._getFormatConfig(inst);
                var date = this.parseDate(dateFormat, defaultDate, settings);
                now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
            }
            
            var applyTimeZones = this._get(inst, 'applyTimeZones');
            if (applyTimeZones) {
                var timeZoneOffset = this._get(inst, 'timeZoneOffset');
                var localTimeZoneOffset = now.getTimezoneOffset();

                now.setMinutes(now.getMinutes() + timeZoneOffset + localTimeZoneOffset);
            }

            if (defaultTimeValue != 0) {
                now = defaultTimeValue == 1 ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0) :
                   new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            }

            return this._restrictMinMax(inst,
			this._determineDate(inst, now, now));
        },

        /* A date may be specified as an exact value or a relative one. */
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            };
            var offsetString = function(offset) {
                try {
                    return $.cmsdatepicker.parseDate($.cmsdatepicker._get(inst, 'dateFormat'),
					offset, $.cmsdatepicker._getFormatConfig(inst));
                }
                catch (e) {
                    // Ignore
                }
                var date = (offset.toLowerCase().match(/^c/) ?
				$.cmsdatepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 'd') {
                        case 'd': case 'D':
                            day += parseInt(matches[1], 10); break;
                        case 'w': case 'W':
                            day += parseInt(matches[1], 10) * 7; break;
                        case 'm': case 'M':
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.cmsdatepicker._getDaysInMonth(year, month));
                            break;
                        case 'y': case 'Y':
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.cmsdatepicker._getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            };
            var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
			(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
            return newDate;
        },

        /* Handle switch to/from daylight saving.
        Hours may be non-zero on daylight saving cut-over:
        > 12 when midnight changeover, but then cannot generate
        midnight datetime, so jump to 1AM, otherwise reset.
        @param  date  (Date) the date to check
        @return  (Date) the corrected date */
        _daylightSavingAdjust: function(date) {
            if (!date) return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },

        /* Set the date(s) directly. */
        _setDate: function(inst, date, noChange) {
            var disableDaySelect = this._get(inst, 'disableDaySelect');
            var disableMonthSelect = this._get(inst, 'disableMonthSelect');
            var defaultTimeValue = this._get(inst, 'defaultTimeValue');

            var defaultMonth = defaultTimeValue == 1 ? 0 : 11;
            var now = new Date();

            if (typeof (date) == 'string') {
                if (disableMonthSelect) {
                    date = parseInt(date, 10) == date ? new Date(date, defaultMonth, 1) : new Date(now.getFullYear(), defaultMonth, 1);
                }
                else if (disableDaySelect) {
                    var split = date.split('/');
                    if (split.length == 2) {
                        var year = parseInt(split[0], 10) == split[0] ? parseInt(split[0], 10) : now.getFullYear();
                        var month = parseInt(split[1], 10) == split[1] ? parseInt(split[1], 10) : now.getMonth(); 0;
                        date = new Date(year, month - 1, 1);
                    }
                    else {
                        var year = parseInt(date, 10) && date != '' ? parseInt(date, 10) : now.getFullYear();
                        date = new Date(year, now.getMonth() - 1, 1);
                    }
                }
            }

            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;

            var defaultDate = this._getDefaultDate(inst);

            var applyTimeZones = this._get(inst, 'applyTimeZones');
            if ((applyTimeZones && (defaultTimeValue == 0))) {
                var timeZoneOffset = this._get(inst, 'timeZoneOffset');
                var localTimeZoneOffset = defaultDate.getTimezoneOffset();

                defaultDate.setMinutes(defaultDate.getMinutes() + timeZoneOffset + localTimeZoneOffset);
            }

            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, defaultDate));

            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            inst.currentHour = newDate.getHours();
            inst.currentMinute = newDate.getMinutes();
            inst.currentSecond = newDate.getSeconds();

            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
                this._notifyChange(inst);
            this._updateDatepicker(inst);
            this._adjustInstDate(inst);
            if (inst.input && noChange) {
                inst.input.val(clear ? '' : this._formatDate(inst));
            }
        },

        /* Retrieve the date(s) directly. */
        _getDate: function(inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
			(new Date(inst.currentYear, inst.currentMonth, inst.currentDay, inst.currentHour, inst.currentMinute, inst.currentSecond)));
            return startDate;
        },

        _getFormattedDate: function(inst) {
            var disableDaySelect = this._get(inst, 'disableDaySelect');
            var disableMonthSelect = this._get(inst, 'disableMonthSelect');

            if (disableMonthSelect) {
                return inst.selectedYear;
            }
            else
                if (disableDaySelect) {
                return inst.selectedYear + "/" + (inst.selectedMonth + 1);
            }

            this._setCurrentTime(inst);
            var date = new Date(inst.currentYear, inst.currentMonth, inst.currentDay, inst.currentHour, inst.currentMinute, inst.currentSecond);
            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
        },

        _compareDates: function(date1, date2) {
            return date1.getFullYear() == date2.getFullYear() && date2.getMonth() == date1.getMonth() && date2.getDate() == date1.getDate();
        },

        /* Generate the HTML for the current state of the date picker. */
        _generateHTML: function(inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(
			new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
            var isRTL = this._get(inst, 'isRTL');
            var showButtonPanel = this._get(inst, 'showButtonPanel');
            var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
            var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
            var stepMonths = this._get(inst, 'stepMonths');
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = (!inst.currentDay ? new Date(9999, 9, 9) :
			new Date(inst.currentYear, inst.currentMonth, inst.currentDay, inst.currentHour, inst.currentMinute, inst.currentSecond, 0));
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            var actionPanelButtons = this._get(inst, 'actionPanelButtons');
            var displayOK = $.inArray('ok', actionPanelButtons) != -1;
            var displayNow = $.inArray('now', actionPanelButtons) != -1;
            var displayNA = $.inArray('na', actionPanelButtons) != -1;
            var okCommand = this._get(inst, 'OKCommand');

            var displaySeconds = this._get(inst, 'displaySeconds');
            var disableDaySelect = this._get(inst, 'disableDaySelect');
            var disableMonthSelect = this._get(inst, 'disableMonthSelect');
            var defaultTimeValue = this._get(inst, 'defaultTimeValue');
            var highlightCurrentDay = this._get(inst, 'highlightCurrentDay');

            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, 'prevText');
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			'<a class="datetime-ui-datepicker-prev datetime-ui-corner-all btn-icon" onclick="DP_jQuery_' + dpuuid +
			'.cmsdatepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' +
			' title="' + prevText + '">' +
			    '<i class="icon-caret-left cms-icon-80 CalendarIcon" aria-hidden="true"></i></a>' :
			(hideIfNoPrevNext ? '' : '<a class="datetime-ui-datepicker-prev datetime-ui-corner-all datetime-ui-state-disabled" title="' + prevText + '"><span class="datetime-ui-icon"></span></a>'));
            var nextText = this._get(inst, 'nextText');
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			'<a class="datetime-ui-datepicker-next datetime-ui-corner-all btn-icon" onclick="DP_jQuery_' + dpuuid +
			'.cmsdatepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' +
			' title="' + nextText + '"><i class="icon-caret-right cms-icon-80 CalendarIcon" aria-hidden="true"></i></a>' :
			(hideIfNoPrevNext ? '' : '<a class="datetime-ui-datepicker-next datetime-ui-corner-all datetime-ui-state-disabled" title="' + nextText + '"><span class="datetime-ui-icon"></span></a>'));
            var currentText = this._get(inst, 'currentText');
            var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

            // Buttons panel
            var okButton = (!inst.inline && displayOK ? '<button type="button" class="btn btn-primary" onclick="DP_jQuery_' + dpuuid +
			'.cmsdatepicker._saveAndClose(\'#' + inst.id + '\');' + okCommand + '";">' + this._get(inst, 'closeText') + '</button>' : '');
            var nowButton = this._isInRange(inst, gotoDate) && displayNow ? "<button type=\"button\" class=\"btn btn-default\" onClick =\"SelectModalDate_" + inst.id + "('now', '" + inst.id + "'); return false;\"  >" + currentText + '</button>' : '';
            var NAButton = displayNA ? '<button type="button" class="btn btn-default" onclick="DP_jQuery_' + dpuuid +
            	'.cmsdatepicker._clearDate(\'#' + inst.id + '\');' + okCommand + '">' + this._get(inst, 'NAText') + '</button>' : '';

            var buttonPanel = (showButtonPanel) ? '<div class="form-group AlignRight action-buttons">' + nowButton + NAButton + okButton + '</div>' : '';

            var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, 'showWeek');
            var dayNames = this._get(inst, 'dayNames');
            var dayNamesShort = this._get(inst, 'dayNamesShort');
            var dayNamesMin = this._get(inst, 'dayNamesMin');
            var monthNames = this._get(inst, 'monthNames');
            var monthNamesShort = this._get(inst, 'monthNamesShort');
            var beforeShowDay = this._get(inst, 'beforeShowDay');
            var showOtherMonths = this._get(inst, 'showOtherMonths');
            var selectOtherMonths = this._get(inst, 'selectOtherMonths');
            var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var numberOfRows = this._get(inst, 'numberOfRows');
            var showTimePanel = this._get(inst, 'showTimePanel');
            var use24HourMode = this._get(inst, 'use24HourMode');
            var AMDesignator = this._get(inst, 'AMDesignator');
            var PMDesignator = this._get(inst, 'PMDesignator');
            var showUnselectable = false;
            var showDaySelector = showUnselectable || (!disableDaySelect && !disableMonthSelect);
            var html = '';
            for (var row = 0; row < numMonths[0]; row++) {
                var group = '';
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = ' datetime-ui-corner-all';
                    var calender = '';
                    if (isMultiMonth) {
                        calender += '<div class="datetime-ui-datepicker-group';
                        if (numMonths[1] > 1)
                            switch (col) {
                                case 0: calender += ' datetime-ui-datepicker-group-first';
                                    cornerClass = ' datetime-ui-corner-left'; break;
                                case numMonths[1] - 1: calender += ' datetime-ui-datepicker-group-last';
                                    cornerClass = ' datetime-ui-corner-right'; break;
                                default: calender += ' datetime-ui-datepicker-group-middle'; cornerClass = ''; break;
                        }
                        calender += '">';
                    }
                    calender += '<div class="datetime-ui-datepicker-header datetime-ui-widget-header datetime-ui-helper-clearfix' + cornerClass + '"><div class="control-group-inline datetime-ui-datepicker-title">' +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
                    (/all|left/.test(cornerClass) && row == 0 ? next : '') +
					(/all|right/.test(cornerClass) && row == 0 ? prev : '') +
					'</div></div><table class="datetime-ui-datepicker-calendar"><thead>' +
					'<tr>';
                    if (showDaySelector) {
                        var thead = (showWeek ? '<th class="datetime-ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
                        for (var dow = 0; dow < 7; dow++) { // days of the week
                            var day = (dow + firstDay) % 7;
                            thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="datetime-ui-datepicker-week-end"' : '') + '>' +
						'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
                        }
                        calender += thead + '</tr></thead><tbody>';
                        var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                        if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                            inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                        var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                        var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
                        var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                        if (numberOfRows != 0) {
                            numRows = numberOfRows;
                        }

                        for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                            calender += '<tr>';
                            var tbody = (!showWeek ? '' : '<td class="datetime-ui-datepicker-week-col">' +
						this._get(inst, 'calculateWeek')(printDate) + '</td>');
                            for (var dow = 0; dow < 7; dow++) { // create date picker days
                                var daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
                                var otherMonth = (printDate.getMonth() != drawMonth);
                                var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || disableDaySelect || disableMonthSelect ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                                tbody += '<td class="' +
							((dow + firstDay + 6) % 7 >= 5 ? ' datetime-ui-datepicker-week-end' : '') + // highlight weekends
							(otherMonth ? ' datetime-ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
                                // or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							(unselectable ? ' ' + this._unselectableClass + ' datetime-ui-state-disabled' : '') +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates                            
							(this._compareDates(printDate, currentDate) ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' datetime-ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							(unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.cmsdatepicker._selectDay(\'#' +
							inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							(unselectable ? '<span class="datetime-ui-state-default">' + printDate.getDate() + '</span>' : '<a class="datetime-ui-state-default' +
							(printDate.getTime() == today.getTime() && highlightCurrentDay ? ' datetime-ui-state-highlight' : '') +
                            (this._compareDates(printDate, currentDate) ? ' datetime-ui-state-active' : '') + // highlight selected day
							(otherMonth ? ' datetime-ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>'; // display selectable date
                                printDate.setDate(printDate.getDate() + 1);
                                printDate = this._daylightSavingAdjust(printDate);
                            }
                            calender += tbody + '</tr>';
                        }
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += '</tbody></table>';

                    if (showTimePanel) {
                        // If not date selected - use default date
                        var dt = new Date(inst.currentYear, inst.currentMonth, inst.currentDay, inst.currentHour, inst.currentMinute, inst.currentSecond);
                        if (inst.currentDay) {
                            dt = currentDate;
                        }

                        var hours = dt.getHours();
                        var ampmValue = 'am';
                        var selected = "selected='selected'";
                        if (!use24HourMode) {
                            if (hours > 12) {
                                hours = hours - 12;
                                ampmValue = 'pm';
                            }
                            else if (hours == 12)
                                ampmValue = 'pm';
                            else if (hours == 0)
                                hours = 12;
                        }
                        // Count max and min for hours
                        var hourMax = 23;
                        var hourMin = 0;
                        var hourShiftID = null;
                        if (!use24HourMode) {
                            hourMax = 12;
                            hourMin = 1;
                            hourShiftID = "'" + inst.id + "_hourShift'";
                        }
                        var format = this._get(inst, 'dateFormat');
                        var zeroHour = format.indexOf('hh') != -1 ? true : false;
                        var zeroMinute = format.indexOf('mm') != -1 ? true : false;
                        var zeroSecond = format.indexOf('ss') != -1 ? true : false;

                        var seconds = "<td class='colon'>:</td><td><input class='datetime-ui-time-textbox' type='text' onKeyDown='return DP_jQuery_" + dpuuid + ".cmsdatepicker._checkHours(event,id,59,0);' id='" + inst.id + "_second' value = '" + this._addZero(dt.getSeconds(), zeroSecond) + "'></td>" +
                                   "<td><div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-n' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_second',59,0,5," + zeroSecond + ",null);\"></div><div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-s' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_second',59,0,-5," + zeroSecond + ",null);\"></div></td>";

                        calender += "<div class=\"RightAlign\">" +
                                   "<table class=\"datetime-ui-time-input\"><tr>" + (isRTL ? "" : "") + "<td><input class='datetime-ui-time-textbox' type='text' onKeyDown='return DP_jQuery_" + dpuuid + ".cmsdatepicker._checkHours(event,id," + hourMax + "," + hourMin + ");' id='" + inst.id + "_hour' value = '" + this._addZero(hours, zeroHour) + "'></td>" +
                                   "<td>" +
                            "<div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-n' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_hour'," + hourMax + "," + hourMin + ",1," + zeroHour + "," + hourShiftID + ");\" ></div>" +
                            "<div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-s' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_hour'," + hourMax + "," + hourMin + ",-1," + zeroHour + "," + hourShiftID + ");\"></div>" +
                            "</td>" +
                            "<td class='colon'>:</td>" +
                            "<td><input class='datetime-ui-time-textbox' type='text' onKeyDown='return DP_jQuery_" + dpuuid + ".cmsdatepicker._checkHours(event,id,59,0);' id='" + inst.id + "_minute' value ='" + this._addZero(dt.getMinutes(), zeroMinute) + "'></td>" +
                                   "<td><div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-n' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_minute',59,0,5," + zeroMinute + ",null);\" ></div><div class='datetime-ui-time-arrow_move datetime-ui-icon datetime-ui-timeicon-s' onclick=\"DP_jQuery_" + dpuuid + ".cmsdatepicker._moveTime ('" + inst.id + "_minute',59,0,-5," + zeroMinute + ",null);\" ></div></td>" +
                                   (displaySeconds ? seconds : '');

                        if (!use24HourMode) {
                            calender += "<td><select class=\"hourShift\"  id ='" + inst.id + "_hourShift' ><option value='am'>" + AMDesignator + "</option><option value='pm' " + (ampmValue == 'pm' ? selected : "") + ">" + PMDesignator + "</option></select></td>";
                        }
                        calender += "</td>" + (isRTL ? "<td style=\"width:100%;\"/>" : "") + "</tr></table></div><div style=\"clear:both\"/>";
                    }

                    calender += (isMultiMonth ? '</div>' +
							((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="datetime-ui-datepicker-row-break"></div>' : '') : '');
                    group += calender;
                }
                html += group;
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ?
			'<iframe src="javascript:false;" class="datetime-ui-datepicker-cover" frameborder="0"></iframe>' : '');
            inst._keyEvent = false;
            return html;
        },

        // Move hour,second or minute up or down with given interval
        _moveTime: function(id, max, min, interval, zeroItem, hourShiftID) {
            var item = $('#' + id);
            var val = parseInt(item.val(), 10);

            if (isNaN(val)) {
                val = 0;
            }

            if ((val % interval != 0) && (interval != 1)) {
                var intPart = Math.abs(Math.floor(val / interval));
                val = Math.abs((intPart + (interval > 0 ? 1 : -1)) * interval);
            }
            else {
                val += interval;
            }

            if (val > max) {
                val = val - max + min - 1;
            }
            if (val < min) {
                val = max + 1 + val - min;
            }

            if (hourShiftID != null) {
                var shift = $('#' + hourShiftID);
                if ((val == max) && (interval == 1)) {
                    shift.val(shift.val() == 'pm' ? 'am' : 'pm');
                }
                if ((val == max - 1) && (interval == -1)) {
                    shift.val(shift.val() == 'pm' ? 'am' : 'pm');
                }
            }

            item.val(this._addZero(val, zeroItem));

        },

        // Add zero to time value if needed
        _addZero: function(val, zeroItem) {
            return (val < 10 && zeroItem) ? "0" + val : val;
        },

        _applySelection: function(id, text, value) {
            var textComponent = document.getElementById(id);
            var selectedText;
            var selStart = 0; ;
            // IE version
            if (document.selection != undefined) {
                textComponent.focus();

                // Find start of selection
                var r = document.selection.createRange();
                selectedText = r.text;
                if (r == null) {
                    return 0;
                }
                var re = textComponent.createTextRange(),
                rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);

                selStart = rc.text.length;
            }
            // Mozilla version
            else if (textComponent.selectionStart != undefined) {
                var selStart = textComponent.selectionStart;
                var endPos = textComponent.selectionEnd;
                selectedText = textComponent.value.substring(selStart, endPos);
            }
            return text.substr(0, selStart) + value + text.substr(selectedText.length + selStart);
        },

        /* Check the input for right value */
        _checkHours: function(e, id, max, min) {
            var value = $('#' + id).val();
            var keyCode = (window.Event) ? e.which : e.keyCode;
            // Alpha numeric
            if (keyCode > 95 && keyCode < 106)
                keyCode -= 48;

            // Let user pres alt shift (back) space delete and left and right arrow, F keys,home or end
            if (e.altKey || e.shiftKey || keyCode == 37 || keyCode == 39 || keyCode == 32 || keyCode == 8 || keyCode == 46 || (keyCode >= 112 && keyCode <= 122) || keyCode == 36 || keyCode == 35)
                return true;

            value = this._applySelection(id, value, String.fromCharCode(keyCode));
            var newVal = parseInt(value, 10);
            if (parseInt(value, 10) != value || newVal < min || newVal > max)
                return false;

            return true;
        },

        /* Generate the month and year header. */
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '';
            var monthHtml = '';
            // month selection
            if (secondary || !changeMonth)
                monthHtml += '<span class="datetime-ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="form-control datetime-ui-datepicker-month input-width-20" ' +
				'onchange="DP_jQuery_' + dpuuid + '.cmsdatepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' +
			 	'>';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) &&
						(!inMaxYear || month <= maxDate.getMonth()))
                        monthHtml += '<option value="' + month + '"' +
						(month == drawMonth ? ' selected="selected"' : '') +
						'>' + monthNamesShort[month] + '</option>';
                }
                monthHtml += '</select>';
            }
            if (!showMonthAfterYear)
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
            // year selection
            inst.yearshtml = '';
            if (secondary || !changeYear)
                html += '<span class="datetime-ui-datepicker-year">' + drawYear + '</span>';
            else {
                // determine range of years to display
                var years = this._get(inst, 'yearRange').split(':');
                var thisYear = new Date().getFullYear();
                var determineYear = function(value) {
                    var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
					(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
					parseInt(value, 10)));
                    return (isNaN(year) ? thisYear : year);
                };
                var year = determineYear(years[0]);
                var endYear = Math.max(year, determineYear(years[1] || ''));
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                inst.yearshtml += '<select class="form-control datetime-ui-datepicker-year input-width-20" ' +
				'onchange="DP_jQuery_' + dpuuid + '.cmsdatepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' +
				'>';
                for (; year <= endYear; year++) {
                    inst.yearshtml += '<option value="' + year + '"' +
					(year == drawYear ? ' selected="selected"' : '') +
					'>' + year + '</option>';
                }
                inst.yearshtml += '</select>';
                //when showing there is no need for later update
                if (!$.browser.mozilla) {
                    html += inst.yearshtml;
                    inst.yearshtml = null;
                } else {
                    // will be replaced later with inst.yearshtml
                    html += '<select class="form-control datetime-ui-datepicker-year"><option value="' + drawYear + '" selected="selected">' + drawYear + '</option></select>';
                }
            }
            html += this._get(inst, 'yearSuffix');
            if (showMonthAfterYear)
                html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
            html += ''; // Close datepicker_header
            return html;
        },

        /* Adjust one of the date sub-fields. */
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + (period == 'Y' ? offset : 0);
            var month = inst.drawMonth + (period == 'M' ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
			(period == 'D' ? offset : 0);
            var date = this._restrictMinMax(inst,
			this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == 'M' || period == 'Y')
                this._notifyChange(inst);
        },

        /* Ensure a date is within any min/max bounds. */
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var newDate = (minDate && date < minDate ? minDate : date);
            newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
            return newDate;
        },

        /* Notify change of month/year. */
        _notifyChange: function(inst) {
            var onChange = this._get(inst, 'onChangeMonthYear');
            if (onChange)
                onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
        },

        /* Determine the number of months to show. */
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, 'numberOfMonths');
            return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
        },

        /* Determine the current maximum date - ensure no time components are set. */
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
        },

        /* Find the number of days in a given month. */
        _getDaysInMonth: function(year, month) {
            return 32 - new Date(year, month, 32).getDate();
        },

        /* Find the day of the week of the first of a month. */
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay();
        },

        /* Determines if we should allow a "next/prev" month display change. */
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0)
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            return this._isInRange(inst, date);
        },

        /* Is the given date in the accepted range? */
        _isInRange: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()));
        },

        /* Provide the configuration settings for formatting/parsing. */
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, 'shortYearCutoff');
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return { shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
                monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames'), PMDesignator: this._get(inst, 'PMDesignator'),
                AMDesignator: this._get(inst, 'AMDesignator')
            };
        },

        /* Format the given date for display. */
        _formatDate: function(inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }

            var date = new Date();
            if (day) {
                if (typeof day == 'object')
                    date = day;
                else {
                    this._setCurrentTime(inst);
                    date = new Date(year, month, day, inst.currentHour, inst.currentMinute, inst.currentSecond, 0);
                }
            }
            else {
                date = new Date(inst.currentYear, inst.currentMonth, inst.currentDay, inst.currentHour, inst.currentMinute, inst.currentSecond, 0);
            }

            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
        }
    });

    /* jQuery extend now ignores nulls! */
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
            target[name] = props[name];
        return target;
    };

    /* Determine whether an object is an array. */
    function isArray(a) {
        return (a && (($.browser.safari && typeof a == 'object' && a.length) ||
		(a.constructor && a.constructor.toString().match(/\Array\(\)/))));
    };

    /* Invoke the datepicker functionality.
    @param  options  string - a command, optionally followed by additional parameters or
    Object - settings for attaching new datepicker functionality
    @return jQuery object */
    $.fn.cmsdatepicker = function(options) {

        /* Initialise the date picker. */
        if (!$.cmsdatepicker.initialized) {
            $(document).mousedown($.cmsdatepicker._checkExternalClick).
			find('body').append($.cmsdatepicker.dpDiv);
            $.cmsdatepicker.initialized = true;
        }

        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'getFormattedDate' || options == 'widget'))
            return $.cmsdatepicker['_' + options + 'Datepicker'].
			apply($.cmsdatepicker, [this[0]].concat(otherArgs));
        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
            return $.cmsdatepicker['_' + options + 'Datepicker'].
			apply($.cmsdatepicker, [this[0]].concat(otherArgs));
        return this.each(function() {
            typeof options == 'string' ?
			$.cmsdatepicker['_' + options + 'Datepicker'].
				apply($.cmsdatepicker, [this].concat(otherArgs)) :
			$.cmsdatepicker._attachDatepicker(this, options);
        });
    };

    $.cmsdatepicker = new CMSDatepicker(); // singleton instance
    $.cmsdatepicker.initialized = false;
    $.cmsdatepicker.uuid = new Date().getTime();
    $.cmsdatepicker.version = "1.8.7";

    // Workaround for #4055
    // Add another global to avoid noConflict issues with inline event handlers
    window['DP_jQuery_' + dpuuid] = $;

})($cmsj);
