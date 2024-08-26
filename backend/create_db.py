import psycopg2
from psycopg2 import sql, OperationalError
from environs import Env

env = Env()
env.read_env()

def create_database(dbname, user, password, host):
    try:
        conn = psycopg2.connect(dbname='postgres', user=user, password=password, host=host)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(dbname)))
        cur.close()
        conn.close()
    except OperationalError as e:
        print(f"Ошибка подключения к базе данных: {e}")
        return

def create_tables(dbname, user, password, host):
    try:
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host)
        cur = conn.cursor()

        cur.execute("""
        CREATE TYPE degree_group AS ENUM('graduate','speciality','master', 'bachelor');
        CREATE TYPE degree_teacher AS ENUM('professor', 'assistant', 'none');
        CREATE TYPE audience_type AS ENUM('lecture','room');
        CREATE TYPE lesson_type AS ENUM('lecture', 'seminar', 'laboratory');

        CREATE TABLE teacher (
            teacher_id SERIAL PRIMARY KEY,
            name VARCHAR(150),
            degree degree_teacher,
            department VARCHAR(50),
            experience SMALLINT
        );

        CREATE TABLE student_group (
            student_group_id SERIAL PRIMARY KEY,
            institute SMALLINT,
            year SMALLINT,
            number SMALLINT,
            speciality VARCHAR(50),
            size SMALLINT,
            degree degree_group
        );

        CREATE TABLE classroom (
            class_id SERIAL PRIMARY KEY,
            type audience_type,
            capacity SMALLINT,
            corpus VARCHAR(10),
            number SMALLINT
        );

        CREATE TABLE subject (
            subject_id SERIAL PRIMARY KEY,
            name VARCHAR(50)
        );

        CREATE TABLE learn_day (
            learn_day_id SERIAL PRIMARY KEY,
            datetime DATE
        );

        CREATE TABLE lesson (
            lesson_id SERIAL PRIMARY KEY,
            date_id INTEGER REFERENCES learn_day(learn_day_id),
            teacher_id INTEGER REFERENCES teacher(teacher_id),
            subject_id INTEGER REFERENCES subject(subject_id),
            class_id INTEGER REFERENCES classroom(class_id),
            number SMALLINT,
            type lesson_type
        );

        CREATE TABLE lesson_group (
            lesson_group_id SERIAL PRIMARY KEY,
            lesson_id INTEGER REFERENCES lesson(lesson_id),
            group_id INTEGER REFERENCES student_group(student_group_id)
        );
        """)

        conn.commit()
        cur.close()
        conn.close()
    except OperationalError as e:
        print(f"Ошибка подключения к базе данных: {e}")
        return

def main():
    dbname = env.str('DB_NAME')
    user = env.str('DB_USER')
    password = env.str('DB_PASSWORD')
    host = env.str('DB_HOST')

    if not all([dbname, user, password, host]):
        raise Exception("Не все переменные окружения установлены. Пожалуйста, проверьте ваш .env файл.")

    create_database(dbname, user, password, host)
    create_tables(dbname, user, password, host)

if __name__ == "__main__":
    main()