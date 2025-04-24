using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlActivity
    {
        public int ActivityId { get; set; }

        public string Activity1 { get; set; } = null!;

        public int ActivityAim { get; set; }

        public string? ActivityDiscription { get; set; }
    }
}
