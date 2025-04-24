using Bl.Api;
using Bl.Models;
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
        public void Create(BlAim aim)
        {
            aims.Create(aim);
        }
        [HttpPut("UpdateAim")]
        public void Update(BlAim aim)
        {
            aims.Update(aim);
        }
        [HttpDelete("Delete")]
        public void Delete(string aimId)
        {
            aims.Delete(aimId);
        }


    }
}

