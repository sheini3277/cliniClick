using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IblAim : Icrud<BlAim>
    {
        List<BlAim> Get();
        void Create(BlAim aim);
        void Update(BlAim aim);
        void Delete(string aimId);
        List<BlAim> GetByPatientId(string patientId);
    }
}
