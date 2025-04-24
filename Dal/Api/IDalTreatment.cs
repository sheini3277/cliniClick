using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IDalTreatment
    {
        List<Treatment> Get();
        void Create(Treatment treatment);
        void Update(Treatment treatment);
        void Delete(int treatmentId);
    }

}


    