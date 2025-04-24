using Bl.Api;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class DalManager : IDal
    {
        dbcontext data = new dbcontext();

        public IDalUser Users { get; }
        public IDalPationt Pationt { get; }
        public IDalActivity Activity { get; }
        public IDalAim Aim{ get; }
        public IDalTreatment Treatment { get; }
        public DalManager()
        {
            Users = new DalUsersService(data);
            Pationt = new DalPationtService(data);
            Treatment = new DalTreatmentService(data);
            Activity = new DalActivityService(data);
            Aim = new DalAimService(data);

        }
    }
}
