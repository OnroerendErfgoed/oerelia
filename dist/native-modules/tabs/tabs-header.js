var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindingMode } from 'aurelia-binding';
import { bindable } from 'aurelia-framework';
var TabsHeader = (function () {
    function TabsHeader() {
    }
    TabsHeader.prototype.click = function (id, event) {
        console.debug('tab-headers::click', event);
        event.stopPropagation();
        event.preventDefault();
        this.tabs = this.tabs.filter(function (tab) {
            tab.active = tab.id === id;
            return tab;
        });
    };
    TabsHeader.prototype.closeTab = function (id, event) {
        console.debug('tab-headers::closeTab', event);
        event.stopPropagation();
        event.preventDefault();
        this.tabs = this.tabs.filter(function (tab) {
            if (tab.id !== id) {
                tab.active = tab.id === 'overzicht';
                return tab;
            }
        });
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], TabsHeader.prototype, "tabs", void 0);
    return TabsHeader;
}());
export { TabsHeader };

//# sourceMappingURL=tabs-header.js.map
