using Bl.Api;
using Bl.Models;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class aimController : Controller
    {
        IblAim aims;

        public aimController(Ibl manager)
        {
            aims = manager.Aim;
        }
        [HttpGet]
        public List<BlAim> Get()
        {
            return aims.Get();
        }

        [HttpPost("AddAim")]
        public List<BlAim> Create(BlAim aim)
        {
            return aims.Create(aim);
        }
        [HttpPut("UpdateAim")]
        public List<BlAim> Update(BlAim aim)
        {
            return aims.Update(aim);
        }
        [HttpDelete("Delete")]
        public List<BlAim> Delete(string aimId)
        {
           return aims.Delete(aimId);
        }
        [HttpGet("getByPatientId/{patientId}")]
        public List<BlAim> GetByPatientId(string patientId)
        {
            return aims.GetByPatientId(patientId);
        }


    }
}

