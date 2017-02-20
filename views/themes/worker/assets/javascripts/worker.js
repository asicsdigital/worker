"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(e){function r(o,t){this.$element=e(o),this.options=e.extend({},r.DEFAULTS,e.isPlainObject(t)&&t),this.init()}var o="qor.worker",t="enable."+o,s="disable."+o,n="click."+o,i=".qor-worker--new",d=".qor-worker-form",a=".qor-worker-form-list",l=".qor-worker--progress",u=".qor-worker-form--show",c=".qor-button--back",f=".qor-js-table",h=".is-selected";return r.prototype={constructor:r,init:function(){this.bind(),this.formOpened=!1,e(u).length&&(this.formOpened=!0)},bind:function(){this.$element.on(n,i,e.proxy(this.showForm,this)).on(n,c,e.proxy(this.hideForm,this))},unbind:function(){this.$element.off(n,i,this.showForm,this).off(n,c,this.hideForm,this)},hideForm:function(r){r.preventDefault();var o=this.$element,t=o.find(d).find(">li");t.show().removeClass("current").find("form").addClass("hidden"),e(c).addClass("hidden"),e(a).show(),this.formOpened=!1,window.onbeforeunload=null,e.fn.qorSlideoutBeforeHide=null},showForm:function(r){var o=e(r.target);if(r.preventDefault(),!this.formOpened){var t=o.closest("li"),s=o.closest(d),n=o.closest(a),i=s.find(">li");i.hide().removeClass("current"),t.addClass("current").show(),e(c).removeClass("hidden"),t.find(a).hide(),n.show().find("form").removeClass("hidden"),this.formOpened=!0}},destroy:function(){this.unbind(),r.getWorkerProgressIntervId&&window.clearInterval(r.getWorkerProgressIntervId)}},r.DEFAULTS={},r.POPOVERTEMPLATE='<div class="qor-modal fade qor-modal--worker-errors" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="mdl-card mdl-shadow--2dp" role="document">\n            <div class="mdl-card__title">\n              <h2 class="mdl-card__title-text">Process Errors</h2>\n            </div>\n          <div class="mdl-card__supporting-text" id="qor-worker-errors"></div>\n            <div class="mdl-card__actions">\n              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-dismiss="modal">close</a>\n            </div>\n          </div>\n        </div>',r.plugin=function(t){return this.each(function(){var s,n=e(this),i=n.data(o);if(!i){if(/destroy/.test(t))return;n.data(o,i=new r(this,t))}"string"==typeof t&&e.isFunction(s=i[t])&&s.apply(i)})},e.fn.qorSliderAfterShow.updateWorkerProgress=function(o){e(".workers-log-output").length&&(r.getWorkerProgressIntervId=window.setInterval(r.updateWorkerProgress,2e3,o))},r.updateTableStatus=function(r){var o=e(f).find(h),t=e(l).data().statusName;o.find('td[data-heading="'+t+'"]').find(".qor-table__content").html(r)},r.isScrollToBottom=function(e){return e.clientHeight+e.scrollTop===e.scrollHeight},r.updateWorkerProgress=function(o){var t=o,s=e(".workers-log-output"),n=e(".qor-worker--progress-value"),i=e(".qor-worker--progress-status"),d=e(l),a=e(f).find(h),u=["killed","exception","cancelled","scheduled"];if(s.length){if(d.size())var c=d.data();if(a.size()&&c&&c.statusName)var m=a.find('td[data-heading="'+c.statusName+'"]').find(".qor-table__content").html();return d.size()&&d.size()&&-1==u.indexOf(c.status)?c.progress>=100?(window.clearInterval(r.getWorkerProgressIntervId),document.querySelector("#qor-worker--progress").MaterialProgress.setProgress(100),r.updateTableStatus(c.status),e(".qor-workers-abort").addClass("hidden"),void e(".qor-workers-rerun").removeClass("hidden")):void e.ajax({url:t,method:"GET",dataType:"html",processData:!1,contentType:!1}).done(function(o){var t=e(o),d=t.find(l).data(),a=d.progress,u=d.status;n.html(a),i.html(u),document.querySelector("#qor-worker--progress").MaterialProgress.setProgress(a);var c=e.trim(s.html()),f=e.trim(t.find(".workers-log-output").html()),h=void 0,p=t.find(".workers-error-output");f!=c&&(h=f.replace(c,""),r.isScrollToBottom(s[0])?s.append(h).scrollTop(s[0].scrollHeight):s.append(h)),p.length&&e(".workers-error-output").html(p.html()),m!=u&&r.updateTableStatus(u),a>=100&&(window.clearInterval(r.getWorkerProgressIntervId),e(".qor-workers-abort").addClass("hidden"),e(".qor-workers-rerun").removeClass("hidden"),e(".qor-worker--progress-result").html(t.find(".qor-worker--progress-result").html()))}):void window.clearInterval(r.getWorkerProgressIntervId)}},e(function(){var o='[data-toggle="qor.workers"]';e(document).on(s,function(t){r.plugin.call(e(o,t.target),"destroy")}).on(t,function(t){r.plugin.call(e(o,t.target))}).triggerHandler(t)}),r});