using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlAim  
    {
        public int AimId { get; set; }

        public string AimName { get; set; } = null!;

        public string? AimDiscription { get; set; }

        public string PaitionId { get; set; } = null!;
    }
}
