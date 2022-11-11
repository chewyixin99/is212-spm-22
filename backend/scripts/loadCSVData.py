# Python script to load .csv data from LMS

import os
from cmath import nan

import mysql.connector
import pandas as pd
from dotenv import load_dotenv

load_dotenv()
db_pw = os.getenv("DATABASE_PASSWORD")
if db_pw is None:
    db_pw = ""

mydb = mysql.connector.connect(
    host="localhost", user="root", password="root", database="SPM"
)
mycursor = mydb.cursor()


def parseCSV(filePath, table_name, DBcolumns):
    csvData = pd.read_csv(filePath, header=0, encoding="cp1252")[1:]

    actualColumns = csvData.columns
    values_sql = ""

    sql = "INSERT into " + table_name + " ("
    for i, each_column in enumerate(DBcolumns):
        # print(each_column)
        if i == len(DBcolumns) - 1:
            sql += each_column + ") VALUES ("
            values_sql += "%s)"
        else:
            sql += each_column + ", "
            values_sql += "%s, "

    sql += values_sql + (";")

    for i, row in csvData.iterrows():
        values_tuple = ()
        values_list = list(values_tuple)
        if len(actualColumns) < len(DBcolumns):
            for j, each_column in enumerate(actualColumns):
                if (not isinstance(row[j], str)) and (not isinstance(row[j], int)):
                    values_list.append("")
                else:
                    values_list.append(row[j])
            values_list.append("Active")
        else:
            for j, each_column in enumerate(DBcolumns):
                if (not isinstance(row[j], str)) and (not isinstance(row[j], int)):
                    values_list.append("")
                else:
                    values_list.append(row[j])

        values_tuple = tuple(values_list)
        # print(values_list)
        mycursor.execute(sql, values_tuple)
        mydb.commit()


# ok
parseCSV(
    "courses.csv",
    "course",
    [
        "course_id",
        "course_name",
        "course_desc",
        "course_status",
        "course_type",
        "course_category",
    ],
)
# parseCSV("role.csv", "role", ["role_id","role_name","status"])
parseCSV(
    "staff.csv",
    "staff",
    ["staff_id", "staff_fname", "staff_lname", "dept", "email", "type", "status"],
)
parseCSV(
    "registration.csv",
    "registration",
    ["reg_id", "course_id", "staff_id", "reg_status", "completion_status"],
)
