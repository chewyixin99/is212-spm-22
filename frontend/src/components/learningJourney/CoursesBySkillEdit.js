import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RESPONSE_CODES, ENDPOINT } from '../../constants'
import { Checkbox, FormControl, InputLabel, ListItemText, OutlinedInput, Select, Typography, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CoursesBySkillEdit = (props) => {


    const [courses, setCourses] = React.useState([]); // courses is an array of strings
    const [retrievedCourses, setRetrievedCourses] = React.useState([]);
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [skill, setSkill] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    // handles checkbox change event
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCourses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
        props.handleAddCourses(typeof value === 'string' ? value.split(',') : value, props.item.skill_name)
    }

    // sets selected id of courses
    const handleCourses = (value) => {
        console.log(value);
        if (selectedCourses.includes(value)) {
            setSelectedCourses(selectedCourses.filter((item) => item !== value));
        } else {
            setSelectedCourses([...selectedCourses, value]);
        }
    };

    // retrieves courses based on skill id
    const retrieveCoursesBySkill = (skill_id) => {
        console.log(skill_id);
        axios.get(`${ENDPOINT}/skills/${skill_id}/courses`)
            .then((response) => {
                console.log(response.data.data.courses);
                setRetrievedCourses(response.data.data.courses);
            })
            .catch((error) => {
                console.log(error);
            }

        );
    }

    
    const compareSelectedSkill = () => {
        // this sets courses state to the courses that are already in the learning journey
        const test = retrievedCourses.filter((course) => {
            return props.selectedCourses.includes(course.course_name)
        }).map((course) => {
            return course.course_name
        }
        )



        console.log(test);
        props.handleAddCourses(typeof test === 'string' ? test.split(',') : test, props.item.skill_name)
        setCourses(test);
        // console.log(courses);

    }

    useEffect(() => {
        setSkill(props.item);
        retrieveCoursesBySkill(props.item.skill_id)
        compareSelectedSkill()

    }, [props.item,props.selectedCourses]);

    return (
        <>
            <Typography variant="h6" key={skill.skill_id} mt={5} gutterBottom>
                {skill.skill_name}
            </Typography>
            <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={courses}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {retrievedCourses.map((course) => (
                        <MenuItem key={course.course_id} value={course.course_name}>
                            <Checkbox checked={courses.indexOf(course.course_name) > -1} value={course.course_id} onChange={e => { handleCourses(e.target.value) }} />
                            <ListItemText primary={course.course_name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )

}

export default CoursesBySkillEdit