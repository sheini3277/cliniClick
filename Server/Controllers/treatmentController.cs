using Bl.Api;
using Bl.Models;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class treatmentController : Controller
    {
        IblTreatment treatments;

        public treatmentController(Ibl manager)
        {
            treatments = manager.Treatment;
        }
        [HttpGet]
        public List<BlTreatment> Get()
        {
            return treatments.Get();
        }

        [HttpPost("AddTreatment")]
        public void Create(BlTreatment treatment)
        {
            treatments.Create(treatment);
        }
        [HttpPut("UpdateTreatment/{TreatmentId}")]
        public void Update(BlTreatment treatment)
        {
            treatments.Update(treatment);
        }
        [HttpDelete("DeleteTreatment")]
        public void Delete(int treatmentId)
        {
            treatments.Delete(treatmentId);
        }
        [HttpGet("getByUserId/{userId}")]
        public List<BlTreatment> Get(string userId)
        {
            return treatments.GetByUserId(userId);
        }
        [HttpGet("getByTreatmentId/{treatmentId}")]
        public BlTreatment Get(int treatmentId)
        {
            return treatments.GetByTreatmentId(treatmentId);
        }

    }
}

