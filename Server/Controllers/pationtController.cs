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
    public class pationtController : ControllerBase
    {
        private readonly IblPationt pationts;

        public pationtController(Ibl manager)
        {
            pationts = manager.Pationt;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = pationts.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPost("AddPationt")]
        public IActionResult Create(BlPationt pationt)
        {
            try
            {
                var result = pationts.Create(pationt);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("getByUserId/{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                var result = pationts.GetByUserId(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpPut("UpdatePation/{patientId}")]
        public IActionResult Update(BlPationt pationt)
        {
            try
            {
                var result = pationts.Update(pationt);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpDelete("Delete/{pationtId}")]
        public IActionResult Delete(string pationtId)
        {
            try
            {
                var result = pationts.Delete(pationtId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }

        [HttpGet("getByPatientId/{patientId}")]
        public IActionResult GetByPatientId(string patientId)
        {
            try
            {
                var result = pationts.GetByPatientId(patientId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת פנימית: {ex.Message}");
            }
        }
    }
}
