/** @odoo-module */

import { PosStore } from "@point_of_sale/app/store/pos_store";
import { patch } from "@web/core/utils/patch";

patch(PosStore.prototype, {
    async afterProcessServerData() {
        await super.afterProcessServerData(...arguments);
        
        // Asignar cliente predeterminado a la orden actual si existe
        if (this.config.default_customer_id) {
            const currentOrder = this.get_order();
            if (currentOrder && !currentOrder.partner_id) {
                // default_customer_id ya ES el partner, no necesitamos buscarlo
                currentOrder.update({ partner_id: this.config.default_customer_id });
            }
        }
    },
    
    add_new_order() {
        const order = super.add_new_order(...arguments);
        
        // Asignar cliente predeterminado a nuevas órdenes
        if (this.config.default_customer_id && order && !order.partner_id) {
            // default_customer_id ya ES el partner completo
            order.update({ partner_id: this.config.default_customer_id });
        }
        
        return order;
    },
});