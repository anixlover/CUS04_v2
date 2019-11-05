using System;
using System.Collections.Generic;

namespace CUS_Mostrar_Resultados.Models
{
    public partial class TPuntaje
    {
        public int PkIpCodP { get; set; }
        public int IpPuntaje { get; set; }
        public int IpNumeroJurado { get; set; }
        public string FkVumtCod { get; set; }

        public TUsuarioModalidadTanda FkVumtCodNavigation { get; set; }
    }
}
