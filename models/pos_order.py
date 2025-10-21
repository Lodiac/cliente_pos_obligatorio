# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.exceptions import ValidationError


class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    @api.constrains('partner_id', 'config_id')
    def _check_partner_required(self):
        """Valida que exista un cliente si la configuración lo requiere"""
        for order in self:
            if order.config_id.require_customer and not order.partner_id:
                raise ValidationError(
                    'Debe seleccionar un cliente para completar esta orden. '
                    'La configuración del PDV "%s" requiere un cliente obligatorio.' % order.config_id.name
                )
    
    @api.model
    def _order_fields(self, ui_order):
        """Asigna el cliente predeterminado si no hay uno seleccionado"""
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        
        # Si no hay cliente en la orden y el PDV tiene un cliente predeterminado
        if not order_fields.get('partner_id'):
            pos_config = self.env['pos.config'].browse(ui_order.get('pos_session_id'))
            if pos_config and pos_config.default_customer_id:
                order_fields['partner_id'] = pos_config.default_customer_id.id
        
        return order_fields