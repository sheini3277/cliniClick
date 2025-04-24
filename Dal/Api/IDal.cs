using Bl.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
        public IDalUser Users { get; }

        public IDalPationt Pationt { get; }

        public IDalAim Aim { get; }

        public IDalActivity Activity { get; }

        public IDalTreatment Treatment { get; }
    }
}
