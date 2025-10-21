/** @odoo-module */

import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

patch(PaymentScreen.prototype, {
    async validateOrder(isForceValidate) {
        const order = this.currentOrder;
        
        // Validar cliente obligatorio - verificar que partner_id existe y tiene un ID
        const hasPartner = order?.partner_id && (order.partner_id.id || order.partner_id.raw?.id);
        
        if (this.pos.config.require_customer && !hasPartner) {
            this.dialog.add(AlertDialog, {
                title: _t("Cliente Requerido"),
                body: _t("No se puede procesar el pago sin un cliente seleccionado."),
            });
            return;
        }
        
        return await super.validateOrder(...arguments);
    },
});