using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblTreatment : Icrud<BlTreatment>
    {
        List<BlTreatment> Get();
        List<BlTreatment> Create(BlTreatment treatment);
        List<BlTreatment> Update(BlTreatment treatment);
        List<BlTreatment> Delete(int id);
        List<BlTreatment> GetByUserId(string userId);
        BlTreatment GetByTreatmentId(int id);

    }
}
