using Bl.Api;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class activityController : Controller
    {
        private readonly IblActivity activities;

        public activityController(Ibl manager)
        {
            activities = manager.Activity;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = activities.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddActivity")]
        public IActionResult Create(BlActivity activity)
        {
            try
            {
                var result = activities.Create(activity);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("AddActivities")]
        public IActionResult CreateList(List<BlActivity> activitiesList)
        {
            try
            {
                var result = activities.creatListActivities(activitiesList);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("UpdateActivity")]
        public IActionResult Update(BlActivity activity)
        {
            try
            {
                var result = activities.Update(activity);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteActivity")]
        public IActionResult Delete(int activityId)
        {
            try
            {
                var result = activities.Delete(activityId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
