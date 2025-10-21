# -*- coding: utf-8 -*-
from odoo import models, fields, api


class PosConfig(models.Model):
    _inherit = 'pos.config'
    
    require_customer = fields.Boolean(
        string='Cliente Obligatorio',
        default=False,
        help='Si está activo, será obligatorio seleccionar un cliente antes de procesar el pago.'
    )
    
    default_customer_id = fields.Many2one(
        'res.partner',
        string='Cliente Predeterminado',
        domain=[('customer_rank', '>', 0)],
        help='Cliente que se asignará automáticamente al crear una nueva orden en este PDV.'
    )