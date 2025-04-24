using Bl.Models;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblPationt : Icrud<BlPationt>
    {
        List<BlPationt> Get();
        void Create(BlPationt pationt);
        List<BlPationt> GetByUserId(string userId);
        void Update(BlPationt pationt);
        void Delete(string pationtId);



    }
}
