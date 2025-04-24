using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblTreatment
    {
        List<BlTreatment> Get();
        void Create(BlTreatment treatment);
        void Update(BlTreatment treatment);
        void Delete(int id);
        List<BlTreatment> GetByUserId(string userId);

    }
}
