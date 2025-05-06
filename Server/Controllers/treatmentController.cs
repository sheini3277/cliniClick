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
        public List<BlTreatment> Create(BlTreatment treatment)
        {
            try
            {
                return treatments.Create(treatment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPut("UpdateTreatment/{TreatmentId}")]
        public List<BlTreatment> Update(BlTreatment treatment)
        {
            return treatments.Update(treatment);
        }
        [HttpDelete("DeleteTreatment")]
        public List<BlTreatment> Delete(int treatmentId)
        {
            return treatments.Delete(treatmentId);
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

