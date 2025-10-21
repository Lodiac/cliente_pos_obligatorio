/** @odoo-module */

import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

patch(ProductScreen.prototype, {
    // Interceptar switchScreen
    async switchScreen(screenName, props) {
        console.log("switchScreen llamado:", screenName);
        
        if (screenName === "PaymentScreen") {
            const order = this.pos.get_order();
            const hasPartner = order?.partner_id && (order.partner_id.id || order.partner_id.raw?.id);
            
            console.log("Validando cliente - hasPartner:", hasPartner);
            
            if (this.pos.config.require_customer && !hasPartner) {
                console.log("BLOQUEANDO - No hay cliente");
                this.dialog.add(AlertDialog, {
                    title: _t("Cliente Requerido"),
                    body: _t("Debes seleccionar un cliente antes de continuar al pago."),
                });
                return;
            }
        }
        
        return await super.switchScreen(...arguments);
    },
    
    // También interceptar el método directo al botón de pago
    async _onClickPay() {
        console.log("_onClickPay llamado");
        
        const order = this.pos.get_order();
        const hasPartner = order?.partner_id && (order.partner_id.id || order.partner_id.raw?.id);
        
        console.log("Validando en _onClickPay - hasPartner:", hasPartner);
        
        if (this.pos.config.require_customer && !hasPartner) {
            console.log("BLOQUEANDO en _onClickPay");
            this.dialog.add(AlertDialog, {
                title: _t("Cliente Requerido"),
                body: _t("Debes seleccionar un cliente antes de continuar al pago."),
            });
            return;
        }
        
        return await super._onClickPay?.(...arguments);
    },
});