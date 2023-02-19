using NHibernate;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public interface ISessionFactoryHelper
    {
        ISession GetSession();
        IStatelessSession GetStateLessSession();
    }
}
