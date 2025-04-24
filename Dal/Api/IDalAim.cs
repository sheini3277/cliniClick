using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IDalAim : Icrud<Aim>
    {
        List<Aim> Get();
        void Create(Aim aim);
        void Update(Aim aim);
        void Delete(string aimId);

    }
}
