'use client';
import React from 'react'
import Box from '@mui/material/Box'
import CommonButton from '@/components/elements/CommonButton'
import CommonAutoComplete from '@/components/elements/CommonAutoCopmlete'
import CommonTable from '@/components/sections/CommonTable'
import TextFiled from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import FormHelperText from '@mui/material/FormHelperText'
import { postDataSample } from '@/actions/sample';
import { DataGrid } from '@mui/x-data-grid'
export interface SamplePostValues {
    name: string
    age: number
    address: string
    phones: {
        phone: string
        corporation: string
        price: number
    }[]
}
const SampleDataSendTemplate = () => {

    const { control, handleSubmit, watch, formState: { errors }, register, getValues } = useForm<SamplePostValues>({
        defaultValues: {
            name: '',
            age: 0,
            address: '',
            phones: []
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phones'
    })

    const [phoneList, setPhoneList] = React.useState<{ phone: string, corporation: string, price: number }[]>([])

    const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

    const handleSendData = async (data: SamplePostValues) => {
        const plainData = JSON.parse(JSON.stringify(data))
        const res = await postDataSample(plainData)
        if (res.code) {
            return setErrorMsg(res.message)
        }
        return setErrorMsg('success')
    }

    const createTableData = (phones: { phone: string, corporation: string, price: number }[]) => {
        return phones.map((phone, index) => {

            return [
                index,
                <Box>
                    <Controller
                        name={`phones.${index}.phone`}
                        control={control}
                        defaultValue={phone.phone}
                        rules={{
                            required: true,
                            // 10文字以上の場合エラー
                            maxLength: {
                                value: 10,
                                message: '10文字以内で入力してください'
                            },
                            // 2文字以下の場合エラー
                            minLength: {
                                value: 2,
                                message: '2文字以上で入力してください'
                            },
                            // 入力不可文字列が含まれていた場合エラー
                            // 入力不可文字は、ハイフン以外の全てのきごう
                            pattern: {
                                value: /^[^-]*$/,
                                message: '入力不可文字が含まれています'
                            }

                        }}
                        render={({ field }) => (
                            <TextFiled {...field} onChange={(event) => {
                                field.onChange(event)
                                console.log('new value', event.target.value)
                                console.log('old value', field.value)
                                setPhoneList((prev) => {
                                    [...prev,
                                    getValues()['phones'][index]]
                                }
                                )

                            }} />
                        )}
                    />
                    <FormHelperText error>
                        <Typography variant='caption' color='error'>
                            {errors?.phones?.[index]?.phone?.message}
                        </Typography>
                    </FormHelperText>
                </Box>
                ,
                <Box>
                    <Controller
                        name={`phones.${index}.corporation`}
                        control={control}
                        rules={
                            {
                                required: true,
                                maxLength: {
                                    value: 10,
                                    message: '10文字以内で入力してください'
                                },
                                minLength: {
                                    value: 2,
                                    message: '2文字以上で入力してください'
                                },
                                pattern: {
                                    value: /^[^-]*$/,
                                    message: '入力不可文字が含まれています'
                                }
                            }
                        }
                        render={({ field }) => (
                            <TextFiled {...field} />
                        )}
                    />
                    <FormHelperText error>
                        <Typography variant='caption' color='error'>
                            {errors?.phones?.[index]?.corporation?.message}
                        </Typography>
                    </FormHelperText>
                </Box>
                ,
                <Controller
                    name={`phones.${index}.price`}
                    control={control}
                    rules={
                        {
                            required: true,
                            maxLength: {
                                value: 10,
                                message: '10文字以内で入力してください'
                            },
                            minLength: {
                                value: 2,
                                message: '2文字以上で入力してください'
                            },
                            pattern: {
                                value: /^[^-]*$/,
                                message: '入力不可文字が含まれています'
                            },
                            // 数値以外の場合エラー
                            validate: (value) => {
                                if (isNaN(value)) {
                                    return '数値を入力してください'
                                }
                            }
                        }
                    }
                    render={({ field }) => (
                        <TextFiled {...field} type='number' />
                    )}
                />
            ]
        })
    }
    const tableHeader = ['no', 'Phone', 'Corporation', 'Price']


    const handleClick = async (...arg: any) => {
        console.log(arg)
        console.log(watch())
    }
    return (
        <Box component={'form'} onSubmit={handleSubmit((data) => handleSendData(data))}>
            {errorMsg && <Alert severity='error'>{errorMsg}</Alert>}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box width={100} p={1} whiteSpace={'nowrap'}>
                    <CommonButton label='add row' type='button' onClick={() => append({ phone: '', corporation: '', price: 0 })} />
                </Box>
                <Box width={100} p={1} whiteSpace={'nowrap'}>
                    <CommonButton label='remove row' type='button' onClick={remove} />
                </Box>
                <Box width={100} p={1}>
                    <CommonButton label='send' type='submit' />
                </Box>
                <Box>
                    <Button onClick={handleClick}>test</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box width={1000} >
                    <Box>
                        <Box>
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <TextFiled
                                        label='名前'
                                        {...field}
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Controller
                                name='age'
                                control={control}
                                render={({ field }) => (
                                    <TextFiled
                                        {...field}
                                        label='年齢'
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Controller
                                name='address'
                                control={control}
                                render={({ field }) => (
                                    <TextFiled
                                        {...field}
                                        label='住所'
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <CommonTable
                        header={tableHeader}
                        cellValues={createTableData(fields)}

                    />
                </Box>
            </Box>
            <DataGrid
                checkboxSelection
                rows={[
                    { id: 1, phone: '090-1234-5678', corporation: 'docomo', price: 1000 },
                    { id: 2, phone: '080-1234-5678', corporation: 'au', price: 2000 },
                    { id: 3, phone: '070-1234-5678', corporation: 'softbank', price: 3000 }
                ]}
                columns={[
                    { field: 'phone', headerName: 'Phone', width: 150 },
                    { field: 'corporation', headerName: 'Corporation', width: 150 },
                    { field: 'price', headerName: 'Price', width: 150 }
                ]}
            />
        </Box>

    )
}

export default SampleDataSendTemplate