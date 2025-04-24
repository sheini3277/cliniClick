using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class dbcontext : DbContext
{
    public dbcontext()
    {
    }

    public dbcontext(DbContextOptions<dbcontext> options)
        : base(options)
    {
    }

    public virtual DbSet<Activity> Activities { get; set; }

    public virtual DbSet<Aim> Aims { get; set; }

    public virtual DbSet<Pationt> Pationts { get; set; }

    public virtual DbSet<Treatment> Treatments { get; set; }

    public virtual DbSet<Turn> Turns { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=\"D:\\Shaina Perkal\\פרויקט גמר\\dataBase.mdf\";Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>(entity =>
        {
            entity.HasKey(e => e.ActivityId).HasName("PK__Activity__0FC9CBECD84C1E76");

            entity.ToTable("Activity");

            entity.Property(e => e.ActivityId).HasColumnName("activityId");
            entity.Property(e => e.Activity1)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("activity");
            entity.Property(e => e.ActivityAim).HasColumnName("activityAim");
            entity.Property(e => e.ActivityDiscription)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("activityDiscription");

            entity.HasOne(d => d.ActivityAimNavigation).WithMany(p => p.Activities)
                .HasForeignKey(d => d.ActivityAim)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Activity__activi__5535A963");
        });

        modelBuilder.Entity<Aim>(entity =>
        {
            entity.HasKey(e => e.AimId).HasName("PK__tmp_ms_x__0FDE4D2D818FD9FA");

            entity.ToTable("Aim");

            entity.Property(e => e.AimId).HasColumnName("aimId");
            entity.Property(e => e.AimDiscription)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("aimDiscription");
            entity.Property(e => e.AimName)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("aimName");
            entity.Property(e => e.PaitionId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("paitionId");

            entity.HasOne(d => d.Paition).WithMany(p => p.Aims)
                .HasForeignKey(d => d.PaitionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Aim__paitionId__05D8E0BE");
        });

        modelBuilder.Entity<Pationt>(entity =>
        {
            entity.HasKey(e => e.PationtId).HasName("PK__tmp_ms_x__D7FEF08FFA1B8FF0");

            entity.ToTable("Pationt");

            entity.Property(e => e.PationtId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("pationtId");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Background)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("background ");
            entity.Property(e => e.BirthDate)
                .HasColumnType("date")
                .HasColumnName("birthDate");
            entity.Property(e => e.CirculationMedium)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("circulationMedium");
            entity.Property(e => e.Diagnosis)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("diagnosis ");
            entity.Property(e => e.EducationalFramework)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("educationalFramework ");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("lastName");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("phone");
            entity.Property(e => e.StartTreatmentDate)
                .HasColumnType("date")
                .HasColumnName("startTreatmentDate");
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("therapistId");

            entity.HasOne(d => d.Therapist).WithMany(p => p.Pationts)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pationt__therapi__0C85DE4D");
        });

        modelBuilder.Entity<Treatment>(entity =>
        {
            entity.HasKey(e => e.TreatmentId).HasName("PK__tmp_ms_x__D7AA58E816A09274");

            entity.ToTable("Treatment");

            entity.Property(e => e.TreatmentId).HasColumnName("treatmentId");
            entity.Property(e => e.BePaid).HasColumnName("bePaid ");
            entity.Property(e => e.Cooperation).HasColumnName("cooperation");
            entity.Property(e => e.Escort)
                .HasMaxLength(15)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("escort");
            entity.Property(e => e.IsComing).HasColumnName("isComing");
            entity.Property(e => e.NextMeetingPlanning)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("nextMeetingPlanning");
            entity.Property(e => e.PationtId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("pationtId");
            entity.Property(e => e.TreatmentDate)
                .HasColumnType("datetime")
                .HasColumnName("treatmentDate");
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("userId");

            entity.HasOne(d => d.Pationt).WithMany(p => p.Treatments)
                .HasForeignKey(d => d.PationtId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Treatment__patio__503BEA1C");

            entity.HasOne(d => d.User).WithMany(p => p.Treatments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Treatment__userI__51300E55");
        });

        modelBuilder.Entity<Turn>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Turn__3214EC07E20BEE5E");

            entity.ToTable("Turn");

            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.PatientId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("patientId");
            entity.Property(e => e.Time).HasColumnName("time");

            entity.HasOne(d => d.Patient).WithMany(p => p.Turns)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Turn__patientId__29221CFB");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__tmp_ms_x__CB9A1CFF1B956B6B");

            entity.ToTable("User");

            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("userId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("firstName");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("lastName");
            entity.Property(e => e.Password)
                .HasMaxLength(15)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("phone");
            entity.Property(e => e.TreatmentType)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS")
                .HasColumnName("treatmentType");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
