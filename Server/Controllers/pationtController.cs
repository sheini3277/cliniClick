using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class pationtController : ControllerBase
    {
        IblPationt pationts;

        public pationtController(Ibl manager)
        {
            pationts = manager.Pationt;
        }
        [HttpGet]
        public List<BlPationt> Get()
        {
            return pationts.Get(); 
        }

        [HttpPost("AddPationt")]
        public void Create(BlPationt pationt)
        {
            pationts.Create(pationt);

        }
        [HttpGet("getByUserId/{userId}")]
        public List<BlPationt> Get(string userId)
        {
            return pationts.GetByUserId(userId);
        }
        [HttpPut("UpdatePation/{patientId}")]
        public void Update(BlPationt pationt)
        {
            pationts.Update(pationt);
        }
        [HttpDelete("Delete")]
        public void Delete(string pationtId)
        {
            pationts.Delete(pationtId);
        }
        [HttpGet("getByPatientId/{patientId}")]
        public BlPationt GetByPatientId(string patientId)
        {
            return pationts.GetByPatientId(patientId);
        }


    }
}
