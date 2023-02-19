using Entities.Dbo;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.Configuration;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace DataAccess
{
    public class NHibernateHelper : ISessionFactoryHelper
    {

        private static ISessionFactory _sessionFactory;
        [ThreadStatic]
        private static ISession _currentSession;
        private IConfiguration _configuration;

        public NHibernateHelper(IConfiguration Configuration)
        {
            _configuration = Configuration;
            getSessionFactory();
        }
        private ISessionFactory getSessionFactory()
        {
            lock (this)
            {
                if (_sessionFactory == null)
                {
                    try
                    {

                        FluentConfiguration configuration = GetConfiguration();
                        _sessionFactory = configuration.BuildSessionFactory();
                    }
                    catch (Exception e)
                    {
                        var s = e.Message;
                    }
                }

                return _sessionFactory;
            }
        }

        private FluentConfiguration GetConfiguration()
        {

            var connStr = _configuration.GetConnectionString("ConnStr");
            AppDomain.CurrentDomain.Load(_configuration["AppSettings:MapAssembly"]);
            var config = Fluently.Configure()
                                 .Database(MsSqlConfiguration.MsSql2012.DefaultSchema("dbo").AdoNetBatchSize(0)
                                           .ConnectionString(connStr))
                .Mappings(m =>
                          m.FluentMappings.AddFromAssembly(AppDomain.CurrentDomain.GetAssemblies().Single(x => x.GetName().Name == _configuration["AppSettings:MapAssembly"])))


                .ExposeConfiguration(cfg => new SchemaExport(cfg)
                                                .Create(true, false));
            return config;
        }

        private ISession getExistingOrNewSession(ISessionFactory factory)
        {
            {
                if (_currentSession == null)
                {
                    _currentSession = factory.OpenSession();
                }
                else if (!_currentSession.IsOpen)
                {
                    _currentSession = factory.OpenSession();
                }
            }

            return _currentSession;
        }

        public ISession GetSession()
        {
            return getExistingOrNewSession(_sessionFactory);
        }

        public IStatelessSession GetStateLessSession()
        {
            return _sessionFactory.OpenStatelessSession();
        }

        private ISession openSessionAndAddToContext(ISessionFactory factory)
        {
            ISession session = factory.OpenSession();
            return session;
        }
    }
}
