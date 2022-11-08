from flask import jsonify


def error(model, identifier, error_type, error_data=None):

    if error_type == "exists":
        return jsonify(
            {
                "code": 400,
                "data": error_data,
                "message": f"{model} {identifier} already exists in the database.",
            }
        )

    elif error_type == "not_inside":
        return jsonify({"code": 401, "message": f"{model} is not inside this {model}"})

    elif error_type == "already_inside":
        return jsonify(
            {"code": 401, "message": f"{model} is already found inside this {model}"}
        )

    elif error_type == "no_records":
        return jsonify(
            {"code": 404, "message": f"No {model} records found in the database."}
        )

    elif error_type == "no_records_by_identifier":
        return jsonify(
            {
                "code": 404,
                "message": f"{model} {identifier} cannot be found in the database.",
            }
        )

    elif error_type == "no_records_under_table":
        return jsonify(
            {
                "code": 404,
                "message": f"No {model} records found under this {identifier}.",
            }
        )

    elif error_type == "internal_server_error_create":
        return jsonify(
            {
                "code": 500,
                "message": f"An error occurred while creating {identifier} record in {model} table.",
            }
        )

    elif error_type == "internal_server_error_update":
        return jsonify(
            {
                "code": 500,
                "message": f"An error occurred while updating {identifier} record in {model} table.",
            }
        )

    elif error_type == "internal_server_error_delete":
        return jsonify(
            {
                "code": 500,
                "message": f"An error occurred while deleting {identifier} record in {model} table.",
            }
        )


# error("course")
# error("staff")
# error("role")
# error("learning journey")
