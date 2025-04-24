using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface Ibl
    {
        public IblUser Users { get; }
        public IblPationt Pationt { get; }
        public IblAim Aim { get; }
        public IblActivity Activity { get; }
        public IblTreatment Treatment { get; }
    }
}
