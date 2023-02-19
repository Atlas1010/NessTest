using AutoMapper;
using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Cfg;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using Models;
using Entities.Mapping;

namespace Services.mapping
{
    public class ModelToEntity : Profile
    {
        private static string connectionString;
        private static ISessionFactory sessionFactory;
        private static FluentConfiguration config;

        /// <summary>
        /// Gets a Session for NHibernate.
        /// </summary>
        /// <value>The session factory.</value>
        private static ISessionFactory SessionFactory
        {
            get
            {
                if (sessionFactory == null)
                {
                    // Get the connection string
                    connectionString = ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString;
                    // Build the configuration
                    config = Fluently.Configure().Database(PostgreSQLConfiguration.PostgreSQL82.ConnectionString(connectionString));
                    // Add the mappings
                    config.Mappings(AddMappings);
                    // Build the session factory
                    sessionFactory = config.BuildSessionFactory();
                }
                return sessionFactory;
            }
        }

        /// <summary>
        /// Add the mappings.
        /// </summary>
        /// <param name="mapConfig">The map config.</param>
        private static void AddMappings(MappingConfiguration mapConfig)
        {
            // Load the assembly where the entities live
            Assembly assembly = Assembly.Load("myProject");
            mapConfig.FluentMappings.AddFromAssembly(assembly);
            // Ignore base types
            var autoMap = AutoMap.Assembly(assembly).IgnoreBase<Users>().IgnoreBase<UsersMap>();
            mapConfig.AutoMappings.Add(autoMap);
            // Merge the mappings
            mapConfig.MergeMappings();
        }

        /// <summary>
        /// Opens a session creating a DB connection using the SessionFactory.
        /// </summary>
        /// <returns></returns>
        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

        /// <summary>
        /// Closes the NHibernate session.
        /// </summary>
        public static void CloseSession()
        {
            SessionFactory.Close();
        }
    
}
}
