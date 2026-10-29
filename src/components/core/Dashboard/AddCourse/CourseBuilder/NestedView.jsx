import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import  ConfirmationModal  from '../../../../common/ConfirmationModal';
import  SubSectionModal  from './SubSectionModal';

export default function NestedView ({handleChangeEditSectionName}){

  const {course}= useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch= useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    console.log("Rendering the page again");
  },[])

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        }, token);

        if (result) {
            const updatedCourseContent = course.courseContent.filter(
                (section) => section._id.toString() !== sectionId.toString()
            );

            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent
            };

            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }


  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
        { subSectionId, sectionId },
        token
    );

    if (result) {
        // update the structure of the course
        const updatedCourseContent = course.courseContent.map((section) => {
            if (section._id.toString() === sectionId.toString()) {

                const updatedSubSections = section.subSection.filter(
                    (subSection) =>
                        subSection._id.toString() !== subSectionId.toString()
                );

                return {
                    ...section,
                    subSection: updatedSubSections
                };
            }

            return section;
        });

        const updatedCourse = {
            ...course,
            courseContent: updatedCourseContent
        };

        dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
}


  return (
    <>
      <div className='rounded-lg bg-richblack-700 p-6 px-8' id='nestedViewContainer'>
        {
          course?.courseContent?.map((section) => (
            //section dropdown
            <details key={section._id} open>
              {/* section dropdown content */}
              <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                <div className='flex items-center gap-x-3'>
                  <RxDropdownMenu className='text-2xl text-richblack-50'/>
                  <p className='font-semibold text-richblack-50'>
                    {section.sectionName}
                    </p>
                </div>
                <div className='flex items-center gap-x-3'>
                  <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                    <MdEdit className='text-xl text-richblack-300' />
                  </button>

                  <button onClick={()=> {
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }}>
                    <RiDeleteBin6Line className='text-xl text-richblack-300' />
                  </button>
                  <span className='font-medium text-richblack-300'>|</span>
                  <BiDownArrow className={`text-xl text-richblack-300`} />
                </div>
              </summary>

              <div className='px-6 pb-4'>
                {/* rendering all subsections within a section */}
                {
                  section?.subSection?.map((data) => (
                    <div key={data?._id} onClick={() => setViewSubSection(data)}
                     className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'>
                      <div className='flex items-center gap-x-3 py-2'>
                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                        <p className='font-semibold text-richblack-50'>{data.title}</p>
                      </div>

                      <div className='flex items-center gap-x-3' onClick={(e) => e.stopPropagation()}>
                         {/* here the stop propogation stops it from running on click of the parent div too */}
                        <button onClick={() => setEditSubSection({...data, sectionId:section._id})}>
                          <MdEdit className='text-xl text-richblack-300'/>
                        </button>
                         <button onClick={()=> {
                          setConfirmationModal({
                            text1: "Delete this Lecture",
                            text2: "Selected Lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }}>
                    <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                  </button>
                      </div>
                    </div>
                  ))
                }
                {/* to add a new lecture to the section */}

                <button onClick={() => setAddSubSection(section._id)} 
                className='mt-3 flex items-center gap-x-1 text-yellow-50'>
                  <AiOutlinePlus className='text-lg'/>
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          ))
        }
      </div>
      {/* modal display */}

      {
        addSubSection ? (
          <SubSectionModal
            modalData= {addSubSection}
            setModalData= {setAddSubSection}
            add={true}
            />
        ) : viewSubSection? ( <SubSectionModal
           modalData= {viewSubSection}
            setModalData= {setViewSubSection}
            view={true}
         />) : editSubSection? (<SubSectionModal
            modalData= {editSubSection}
            setModalData= {setEditSubSection}
            edit={true}
         />
         ) :(<div></div>)
      }

      {
        confirmationModal? (
          <ConfirmationModal modalData={confirmationModal}/>
        ):(
          <></>
        )
      }

    </>
  )
}
