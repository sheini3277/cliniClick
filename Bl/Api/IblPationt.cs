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
        List<BlPationt> Create(BlPationt pationt);
        List<BlPationt> GetByUserId(string userId);
        List<BlPationt> Update(BlPationt pationt);
        List<BlPationt> Delete(string pationtId);
        BlPationt GetByPatientId(string patientId);



    }
}
