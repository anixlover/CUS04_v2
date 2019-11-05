using System;
using System.Collections.Generic;

namespace CUS_Mostrar_Resultados.Models
{
    public partial class TTipoUsuario
    {
        public TTipoUsuario()
        {
            TUsuario = new HashSet<TUsuario>();
        }

        public int PkItuTipoUsuario { get; set; }
        public string VtuNombreTipoUsuario { get; set; }

        public ICollection<TUsuario> TUsuario { get; set; }
    }
}
