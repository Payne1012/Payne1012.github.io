// 2016-05-20 09:57:01
(function () {
    var Linkage = function (options, data, success) {
        var _$ = function (id) {
            return document.getElementById(id);
        }
        var items = [],
            item = {};

        var defFilter = function (currentDrop, currentData) {
            if (currentDrop.prevdrop) {
                //如果此条数据在上级未使用跳过
                if (currentDrop.prevdrop.element.value != currentData[currentDrop.prevdrop.valueIndex]) {
                    return false;
                }
                //如果上级存在过滤方法 执行
                if (currentDrop.prevdrop.filter) {
                    var f = currentDrop.prevdrop.filter(currentData);
                    if (f == undefined ? false : !f) {
                        return false;
                    }
                }
                return defFilter(currentDrop.prevdrop, currentData);
            }
            return true;
        }
        var drop = function (option) {
            this.element = _$(option.id);
            this.id = option.id;
            this.text = option.text || '请选择';
            this.value = option.value || '0';
            option.selected && (this.selected = option.selected);
            option.filter && (this.filter = option.filter);
            option.selectchange && (this.selectchange = option.selectchange);
            if (items.length > 0) {
                this.prevdrop = items[items.length - 1];
                var self = this;
                this.prevdrop.element.onchange = function () {
                    self.bind();
                }
                this.prevdrop.nextdrop = this;
                if (option.textIndex == undefined) {
                    option.textIndex = Math.max(this.prevdrop.textIndex, this.prevdrop.valueIndex) + 1;
                }
            }
            this.textIndex = option.textIndex || items.length;
            this.valueIndex = option.valueIndex || this.textIndex;
        };

        drop.prototype.bind = function () {
            var self = this,
                element = self.element,
                currentData = [],
                filterObj = {},
                nextbind = false;
            element.length = 0;
            element.options.add(new Option(self.text, self.value));

            self.nextdrop && self.nextdrop.bind();
            if (self.prevdrop && self.prevdrop.element.value == self.prevdrop.value) {
                self.selectchange && self.selectchange([]);
                return;
            }
            for (var j = 0; j < data.length; j++) {
                //经销商数据断层直接忽略，否则就会报错
                if (data[j] == undefined) {
                    continue;
                }
                var d = data[j];
                var text = d[self.textIndex];
                //排重
                if (filterObj[text] != undefined) {
                    currentData.push(d);
                    continue;
                }

                if (!defFilter(self, d)) {
                    continue;
                }
                currentData.push(d);
                filterObj[text] = text;
                //如果存在过滤方法进行过来处理 调用方式有待优化
                if (self.filter) {
                    var f = self.filter(d);
                    if (f == undefined ? false : !f) {
                        continue;
                    }
                }
                var option = new Option(text, d[self.valueIndex]);
                element.options.add(option);
                //如果是选定的内容 设置选项选中并设置调用下一个的绑定方法
                if (self.selected && (typeof self.selected == 'function' ? self.selected() : self.selected) == text) {
                    option.selected = true;
                    nextbind = true;
                }
            }

            //如果选项中只有一个数据项 删除默认选项并设置调用下一个的绑定方法
            if (element.length == 2) {
                element.remove(0);
                nextbind = true;
            }
            self.selectchange && self.selectchange(currentData);
            if (nextbind) {
                self.nextdrop && self.nextdrop.bind();
            }
        }
        drop.prototype.gettext = function () {
            return this.element.options[this.element.selectedIndex].innerHTML;
        };

        var add = function (optons) {
            var d = new drop(optons);
            items.push(d);
            item[d.id] = d;
        }
        var bind = function () {
            items[0].bind();
            success && success();
        }
        for (var i = 0; i < options.length; i++) {
            add(options[i]);
        }
        bind();

        return {
            items: items,
            item: item,
            bind: bind
        }
    }


    window.AL = Linkage;

})();

