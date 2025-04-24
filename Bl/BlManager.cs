using Bl.Api;
using Bl.Services;
using Dal;
using Dal.Api;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class BlManager : Ibl
    {
        public IblUser Users { get; set; }
        public IblPationt Pationt { get; set; }
        public IblActivity Activity { get; set; }
        public IblAim Aim { get; set; }
        public IblTreatment Treatment { get; set; }

        public BlManager()
        {
            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<IDal, DalManager>();
            services.AddSingleton<IblUser, BlUsersService>();
            services.AddSingleton<IblPationt, BlPationtService>();
            services.AddSingleton<IblActivity, BlActivityService>();
            services.AddSingleton<IblAim, BlAimService>();
            services.AddSingleton<IblTreatment, BlTreatmentService>();

            ServiceProvider servicesProvider = services.BuildServiceProvider();
            Users = servicesProvider.GetRequiredService<IblUser>();
            Pationt = servicesProvider.GetRequiredService<IblPationt>();
            Activity = servicesProvider.GetRequiredService<IblActivity>();
            Aim = servicesProvider.GetRequiredService<IblAim>();
            Treatment = servicesProvider.GetRequiredService<IblTreatment>();

        }
    }
}
