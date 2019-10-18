using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResumeBuilder.Models;

namespace ResumeBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly ResumeBuilderContext _context;

        public SkillsController(ResumeBuilderContext context)
        {
            _context = context;
        }

        // GET: api/Skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skills>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Skills>> GetSkills(int id)
        {
            var skills = await _context.Skills.FindAsync(id);

            if (skills == null)
            {
                return NotFound();
            }

            return skills;
        }

        // PUT: api/Skills/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkills(int id, Skills skills)
        {
            int resumeId = id;
            int skillsId = skills.SkillsId;
            var skill = _context.Skills.First(l => l.SkillsId == skillsId);

            skill.Name = skills.Name;
            skill.Level = skills.Level;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                Console.WriteLine(e);
            }


            return NoContent();
        }

        // POST: api/Skills
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("{id}")]
        public async Task<ActionResult<Skills>> PostSkills(int id, Skills skills)
        {
            _context.Skills.Add(skills);

            await _context.SaveChangesAsync();

            var newSkillsData = await _context.Skills.Where(l => l.ResumeId == id).ToListAsync();

            return Ok(newSkillsData);
        }

        // DELETE: api/Skills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Skills>> DeleteSkills(int id)
        {
            var skillsData = await _context.Skills.FindAsync(id);
            if (skillsData == null)
            {
                return NotFound();
            }
            int resumeId = skillsData.ResumeId;
            _context.Skills.Remove(skillsData);
            await _context.SaveChangesAsync();

            return Ok(await _context.Skills.Where(l => l.ResumeId == resumeId).ToListAsync());
        }

        private bool SkillsExists(int id)
        {
            return _context.Skills.Any(e => e.SkillsId == id);
        }
    }
}
