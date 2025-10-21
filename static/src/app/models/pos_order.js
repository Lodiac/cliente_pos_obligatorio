/** @odoo-module */

import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { patch } from "@web/core/utils/patch";

patch(PosOrder.prototype, {
    setup(vals) {
        super.setup(...arguments);
        
        // Asignar cliente predeterminado al crear la orden
        setTimeout(() => {
            this.assignDefaultCustomerIfNeeded();
        }, 100);
    },
    
    assignDefaultCustomerIfNeeded() {
        // Solo si no hay cliente ya
        if (this.partner_id) {
            return;
        }
        
        // Verificar configuración
        const config = this.session?.config_id;
        if (!config?.default_customer_id) {
            return;
        }
        
        // default_customer_id ya ES el partner, no un ID
        this.update({ partner_id: config.default_customer_id });
    },
});