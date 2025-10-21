# -*- coding: utf-8 -*-
{
    'name': 'Cliente Obligatorio en POS',
    'version': '18.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Hace obligatorio seleccionar un cliente en el Punto de Venta y permite configurar un cliente predeterminado',
    'description': """
        Cliente Obligatorio en POS
        ==========================
        
        Este módulo permite:
        * Activar la validación de cliente obligatorio por cada PDV
        * Configurar un cliente predeterminado que se asigna automáticamente al abrir una orden
        * Validar que exista un cliente antes de ir a la pantalla de pago
        * Bloquear el cambio de cliente una vez en la pantalla de pago
        
        Flujo de trabajo:
        1. Al abrir una nueva orden, se asigna automáticamente el cliente predeterminado (si está configurado)
        2. Durante la venta, el cajero puede cambiar el cliente libremente
        3. Al intentar ir a la pantalla de pago, valida que exista un cliente seleccionado
        4. Una vez en la pantalla de pago, no se permite cambiar el cliente
    """,
    'author': 'Lodiac',
    'website': '',
    'phone': '+527861429929',
    'depends': ['point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/pos_config_views.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'cliente_pos_obligatorio/static/src/app/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}