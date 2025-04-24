using Bl.Api;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class activityController : Controller
    {
        IblActivity activities;

        public activityController(Ibl manager)
        {
            activities = manager.Activity;
        }
        [HttpGet]
        public List<BlActivity> Get()
        {
            return activities.Get();
        }

        [HttpPost("AddActivity")]
        public void Create(BlActivity activity)
        {
            activities.Create(activity);
        }
        [HttpPut("UpdateActivity")]
        public void Update(BlActivity activity)
        {
            activities.Update(activity);
        }
        [HttpDelete("DeleteActivity")]
        public void Delete(string activityId)
        {
            activities.Delete(activityId);
        }


    }
}

