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
        List<BlAim> Create(BlAim aim);
        List<BlAim> Update(BlAim aim);
        List<BlAim> Delete(int aimId);
        List<BlAim> GetByPatientId(string patientId);
        List<BlAim> CreateList(List<BlAim> aims);
    }
}
