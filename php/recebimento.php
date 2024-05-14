<?php

require "init.php";
$PDO = db_connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getDados($id);
        } else {
            getDados();
        }
        break;
    case 'POST':
        if (empty($_POST["id"])) {
            insertRecibo();
        } else {
            $id = intval($_GET["id"]);
            updateDados($id);
        }
        break;
    case 'DELETE':
        // Delete Product
        $id = intval($_GET["id"]);
        deleteDados($id);
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function getDados($id = 0)
{
    $PDO = db_connect();
    $sql = "SELECT id, data_recibo, nr_recibo, nome_recibo, vlr_recibo from pc_recibo";
    if ($id != 0) {
        $sql .= " where id = " . $id . " LIMIT 1";
    }
    $sql .= " order by 1";

    try {
        $stmt = $PDO->prepare($sql);
        $response = array();
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $message = "Erro ao selecionar recibo " . $e->getMessage();
    } catch (Exception $e) {
        $message = "General Error: recibo nПлкo selecionado " . $e->getMessage();
    }

    if (isset($stmt)) {
        echo json_encode($response);
    } else {
        header("HTTP/1.0 400 Bad Request");
        $response = array(
            'status_message' => $message
        );
    }
}


function insertRecibo()
{
    $data = getRequestDataBody();
    $message = "";
    if ($data !== []) {
        $nr_recibo = $data["nr_recibo"];
        $id_cadastro = $data["id_cadastro"];
        $vlr = $data["vlr"];

        $PDO = db_connect();
        $sql = "INSERT INTO recibo_cadastro (nr_recibo, id_cadastro, vlr) VALUES (?, ?, ?)";
        try {
            $PDO->beginTransaction();
            $stmt = $PDO->prepare($sql)->execute([$nr_recibo, $id_cadastro, $vlr]);
            $PDO->commit();
            http_response_code(201); // Created
            echo json_encode(array("message" => "Registro was created."));
        } catch (PDOException $e) {
            $PDO->rollBack();
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error: " . $e->getMessage()));

        } catch (Exception $e) {
            $PDO->rollBack();
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
    }

}


function updateDados($id)
{
    $evento = $_POST["evento"];
    $cadastro = $_POST["cadastro"];

    $PDO = db_connect();
    $sql = "UPDATE evento_cadastro SET id_evento=?, id_pagamento=? WHERE id=?";
    $stmt = $PDO->prepare($sql)->execute([$evento["id_evento"], $cadastro["id"], $id]);

    if ($stmt) {
        $response = array(
            'status' => 1,
            'status_message' => 'Inscricao atualizado com sucesso.'
        );
    } else {
        $response = array(
            'status' => 0,
            'status_message' => 'erro ao atualizar Inscricao.'
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function deleteDados($id)
{
    $PDO = db_connect();
    $sql = "DELETE FROM Pagamentos WHERE id=?";
    $stmt = $PDO->prepare($sql)->execute([$id]);

    if ($stmt) {
        $response = array(
            'status' => 1,
            'status_message' => 'Inscricao removida com sucesso.'
        );
    } else {
        $response = array(
            'status' => 0,
            'status_message' => 'erro ao remover Inscricao'
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}