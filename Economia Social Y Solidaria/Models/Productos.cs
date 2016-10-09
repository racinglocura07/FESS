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
    
    public partial class Productos
    {
        public Productos()
        {
            this.Comentarios = new HashSet<Comentarios>();
            this.CompraProducto = new HashSet<CompraProducto>();
            this.Costos = new HashSet<Costos>();
            this.Precios = new HashSet<Precios>();
        }
    
        public int idProducto { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string cantidad { get; set; }
        public bool esAlmacen { get; set; }
        public bool activo { get; set; }
    
        public virtual ICollection<Comentarios> Comentarios { get; set; }
        public virtual ICollection<CompraProducto> CompraProducto { get; set; }
        public virtual ICollection<Costos> Costos { get; set; }
        public virtual ICollection<Precios> Precios { get; set; }
    }
}
