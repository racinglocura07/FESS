//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Economia_Social_Y_Solidaria.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductosLocales
    {
        public int idProductoLocal { get; set; }
        public int productoId { get; set; }
        public int localId { get; set; }
    
        public virtual Locales Locales { get; set; }
        public virtual Productos Productos { get; set; }
    }
}
