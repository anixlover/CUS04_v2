using System;
using System.Collections.Generic;

namespace CUS_Mostrar_Resultados.Models
{
    public partial class TCategoria
    {
        public TCategoria()
        {
            TUsuario = new HashSet<TUsuario>();
        }

        public int PkIcCodCat { get; set; }
        public string VcNomCategoria { get; set; }

        public ICollection<TUsuario> TUsuario { get; set; }
    }
}
