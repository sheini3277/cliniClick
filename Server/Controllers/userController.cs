using Bl.Api;
using Bl.Models;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private readonly IblUser users;

        public userController(Ibl manager)
        {
            users = manager.Users;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = users.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPost("Add")]
        public IActionResult Create(BlUser user)
        {
            try
            {
                var result = users.Create(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPut("update/{userId}")]
        public IActionResult Update(BlUser user)
        {
            try
            {
                users.Update(user);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpDelete("Delete/{userId}")]
        public IActionResult Delete(string userId)
        {
            try
            {
                var result = users.Delete(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("GetById/{userId}")]
        public IActionResult GetById(string userId)
        {
            try
            {
                var result = users.Get(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }
    }
}
