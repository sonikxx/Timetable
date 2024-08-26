import psycopg2
from psycopg2 import sql, OperationalError
from environs import Env

env = Env()
env.read_env()

def drop_database(dbname, user, password, host):
    conn = psycopg2.connect(dbname='postgres', user=user, password=password, host=host)
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(sql.SQL("DROP DATABASE IF EXISTS {}").format(sql.Identifier(dbname)))
    cur.close()
    conn.close()

def main():
    dbname = env.str('DB_NAME')
    user = env.str('DB_USER')
    password = env.str('DB_PASSWORD')
    host = env.str('DB_HOST')

    if not all([dbname, user, password, host]):
        raise Exception("Не все переменные окружения установлены. Пожалуйста, проверьте ваш .env файл.")

    drop_database(dbname, user, password, host)

if __name__ == "__main__":
    main()